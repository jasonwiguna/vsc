import { useState } from 'react'
import * as Yup from 'yup'
import { useFormikContext } from 'formik'
import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import styles from './my-filepond.module.scss'
import { v4 } from "uuid";
import { presignedPost } from '../services/applicationService'
import { backendAxiosInstance } from '../services/axiosInstance'

// https://pqina.nl/filepond/docs/patterns/plugins/file-validate-type/
registerPlugin(FilePondPluginFileValidateType)
// https://pqina.nl/filepond/docs/patterns/plugins/file-validate-size/
registerPlugin(FilePondPluginFileValidateSize)

const acceptedMimeTypes = [
  'application/zip',
]
const acceptedFileTypesStr = 'zip'
const maxFileSizeFilepond = '100MB'
const maxFileSizeStr = '100 MB'

export const paramMap = {
  FILENAME_WITHOUT_EXTENSION: 'filenameWithoutExtension',
  FILE_EXTENSION: 'fileExtension',
}

export const initialValues = {
  [paramMap.FILENAME_WITHOUT_EXTENSION]: '',
  [paramMap.FILE_EXTENSION]: '',
}

export const validationSchema = {
  [paramMap.FILENAME_WITHOUT_EXTENSION]: Yup.string().required(),
  [paramMap.FILE_EXTENSION]: Yup.string().required(),
}

export default function FileUploader() {
  const [files, setFiles] = useState([])
  const formik = useFormikContext()

  const formikHasRelevantError = Object.values(paramMap).some(
    (param) => param in formik.errors && param in formik.touched
  )

  return (
    <div className={formikHasRelevantError ? 'formik_error' : undefined}>
      <FilePond
        name="file"
        allowMultiple={false}
        labelIdle="Drag &amp; drop<br>or <span>browse.</span>"
        labelFileTypeNotAllowed="Invalid file type"
        fileValidateTypeLabelExpectedTypes={`Expected: ${acceptedFileTypesStr}`}
        acceptedFileTypes={acceptedMimeTypes}
        maxFileSize={maxFileSizeFilepond}
        files={files}
        onupdatefiles={setFiles}
        onaddfile={(error, file) => {
          if (error) return
          // Set metadata here for use in server.process
          file.setMetadata('file_info', {
            filename_without_extension: file.filenameWithoutExtension,
            file_extension: file.fileExtension,
          })
        }}
        server={{
          revert: () => {
            // Clear the fields
            formik.setFieldValue(paramMap.FILENAME_WITHOUT_EXTENSION, '')
            formik.setFieldValue(paramMap.FILE_EXTENSION, '')
          },
          process: async (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort
          ) => {
            const filenameWithoutExtension = `${v4()}`
            const fileExtension = 'zip'
            const filename = `${filenameWithoutExtension}.${fileExtension}`

            const {
              url
            } = await presignedPost(filename)
            
            const formData = new FormData()
            formData.append('file', file)

            // TODO: fix, doesn’t work because FilePond’s "tap to cancel" doesn’t
            // Set up capability to cancel
            // https://github.com/axios/axios#cancellation
            const CancelToken = axios.CancelToken
            const source = CancelToken.source()

            try {
              // Upload to GCS
              await backendAxiosInstance.post(`/backend/storage/upload/${filename}`, formData, {
                headers: {
                  "Content-Type": 'application/zip'
                },
                cancelToken: source.token,
                // Sync axios upload progress with FilePond’s
                onUploadProgress: (progress_event) => {
                  const { lengthComputable, loaded, total } = progress_event
                  progress(lengthComputable, loaded, total)
                },
              })

              // If upload succeeds, do these things

              // Set Formik values
              formik.setFieldValue(
                paramMap.FILENAME_WITHOUT_EXTENSION,
                filenameWithoutExtension
              )
              formik.setFieldValue(paramMap.FILE_EXTENSION, fileExtension)

              // 2. Tell FilePond it’s done (else the UI won’t update to green)
              load()
            } catch {
              // Tell FilePond it errored (update UI to red)
              error()
            }

            return {
              abort: () => {
                // TODO: find out why this doesn’t work (tap to cancel doesn’t trigger this)
                console.log('abort')
                abort()
              },
            }
          },
        }}
        // className="py-3"
        className={styles.my_filepond}
      />
      <div className="text-muted small px-3">
        {formikHasRelevantError ? (
          <div className="text-danger">Required</div>
        ) : null}
        <div>
          Accepted file type: <b>{acceptedFileTypesStr}</b>
        </div>
        <div>
          Max. size: <b>{maxFileSizeStr}</b>
        </div>
      </div>
    </div>
  )
}
