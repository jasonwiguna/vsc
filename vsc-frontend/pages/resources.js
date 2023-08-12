import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Carousel from 'nuka-carousel';
import { Modal } from 'react-bootstrap'
import { useState } from 'react';
import { fetchPricing, subscribe } from '../services/subscriptionService';
import { useQuery, useMutation } from 'react-query'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form } from 'react-bootstrap'
import { MyEmailInput, MyTextInput, MyCheckbox, MySelect } from '../components/MyInput';

const statusMap = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

const paramMap = {
  firstname: 'firstname',
  lastname: 'lastname',
  company: 'company',
  email: 'email',
  phone: 'phone',
  country: 'country',
  updatePermission: 'updatePermission',
  pricingPackageId: 'pricingPackageId',
  paymentPlan: 'paymentPlan',
  subscriptionDate: 'subscriptionDate',
  expirationDate: 'expirationDate',
}

const validationSchema = Yup.object({
  [paramMap.firstname]: Yup.string().required(),
  [paramMap.lastname]: Yup.string().required(),
  [paramMap.company]: Yup.string().required(),
  [paramMap.email]: Yup.string().email().required(),
  [paramMap.phone]: Yup.string().required(),
  [paramMap.country]: Yup.string().required(),
  [paramMap.updatePermission]: Yup.boolean().required(),
  [paramMap.pricingPackageId]: Yup.string().required(),
  [paramMap.paymentPlan]: Yup.string().required(),
  [paramMap.subscriptionDate]: Yup.string().required(),
  [paramMap.expirationDate]: Yup.string().nullable(),
})

const initialValues = {
  firstname: '',
  lastname: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  updatePermission: false,
  pricingPackageId: '',
  paymentPlan: 'PERPETUAL',
  subscriptionDate: new Date(),
  expirationDate: null,
}

export default function Resources() {
  const { status, data } = useQuery(
    ['pricing'], () => fetchPricing()
  )
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(true)
  }
  function handleClose() {
    setIsOpen(false)
  }
  
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const { mutate, error } = useMutation(subscribe, {
    onSuccess: () => {
      setSubmissionStatus(statusMap.SUCCESS)
      handleCloseForm()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })
  const permission = <div>I agree to receive updates</div>
  
  return (
    <div className={styles.container}>
      <Head>
        <title>VSTREAM</title>
        <link rel="icon" href="/LOGO/VSTREAM LOGO/VStreamLOGO_Circle.png" />
        <link
          rel="stylesheet"
          type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <div id='home' className={styles.title_section}>
        <video className={styles.background_video} autoPlay loop muted>
          <source src="/Video/coverWEBSITEVSTREAMREVISED.mp4" type="video/mp4"/>
        </video>
        <h1 className={styles.title_card}>
          <div>
            AV over IP technology <span style={{ color: '#aed673' }}>Solution Provider</span>
          </div>
          <div>
            Hybrid video streaming partner
          </div>
        </h1>
      </div>

      <div id='contact' className={styles.cta_section}>
        <img onClick={handleOpen} src='/Elements/RESOURCES PAGE/cta.png' style={{width:"100%", margin:"0 auto"}}/>
      </div>


      <Modal show={isOpen} onHide={handleClose} size='md' centered>
        <Modal.Body className={styles.modal}>
          <div className={styles.modalContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mutate(values)
            }}
          >
            {(values) => <FormikForm>
              <Row className="mt-2">
                <div>
                  <Form.Row>
                    <Col md={6} className="pl-3">
                      {/* Firstname */}
                      <MyTextInput
                        label="Firstname"
                        id="firstname"
                        name={paramMap.firstname}
                        placeholder="John"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Lastname */}
                      <MyTextInput
                        label="Lastname"
                        id="lastname"
                        name={paramMap.lastname}
                        placeholder="Doe"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Company */}
                      <MyTextInput
                        label="Company"
                        id="company"
                        name={paramMap.company}
                        placeholder="VStream"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* email */}
                      <MyEmailInput
                        label="Email"
                        id="email"
                        name={paramMap.email}
                        placeholder="example@email.com"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Phone */}
                      <MyTextInput
                        label="Phone"
                        id="phone"
                        name={paramMap.phone}
                        placeholder="81234567"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Country */}
                      <MyTextInput
                        label="Country"
                        id="country"
                        name={paramMap.country}
                        placeholder="Singapore"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6} className="pl-3">
                      {/* Package */}
                      <MySelect
                        label="Pricing Package"
                        id="pricingPackageId"
                        name={paramMap.pricingPackageId}
                        disabled={status !== 'success'}
                        required
                        className="mb-3"
                      >
                        <option value="">
                          {status === 'loading' ? 'Loading…' : 'Select'}
                        </option>
                        {status === 'success' &&
                          data.map((pricing) => (
                            <option key={pricing.id} value={pricing.id}>
                              {pricing.packageName} for ${pricing.perpetualPrice}
                            </option>
                          ))}
                      </MySelect>
                    </Col>
                  </Form.Row>
                  <Col md={12} className="pl-3">
                    {/* Permission */}
                    <MyCheckbox
                      label={permission}
                      id="updatePermission"
                      name={paramMap.updatePermission}
                    />
                  </Col>
                </div>
              </Row>

              <div className='d-flex flex-row my-3 justify-content-center'>
                <button className='mr-3' onClick={() => handleClose()}>Cancel</button>
                <button disabled={values.isSubmitting} type='submit'>Submit</button>
              </div>
            </FormikForm>}
          </Formik>
          </div>
        </Modal.Body>
      </Modal>

      <div id='resources' className={styles.info_section}>
        <div className={styles.resources_header}>
          <img className={styles.resources_icon} src='/LOGO/VSTREAM LOGO/VStreamLOGO_Circle.png'/>
          Paid Resources
        </div>
        <div className={styles.content_header}>
          <Carousel className='carousel no-border' 
            wrapAround={true} slidesToShow={3} 
            style={{ maxWidth: "76rem", margin: "0 auto" }} cellSpacing={8}
            renderCenterLeftControls={({ previousSlide }) => {}}
            renderCenterRightControls={({ nextSlide }) => {}}
            renderBottomCenterControls={() => {}}
          >
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 15.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 16.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 17.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
          </Carousel>
        </div>
        <div className={styles.content_header_mobile}>
          <Carousel className='carousel no-border' 
            wrapAround={true} slidesToShow={1} 
            style={{ maxWidth: "76rem", margin: "0 auto" }} cellSpacing={8}
            renderCenterLeftControls={({ previousSlide }) => (
              <button onClick={previousSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-left" /> */}
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button onClick={nextSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-right" /> */}
              </button>
            )}
          >
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 15.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 16.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
            <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 17.png' style={{maxWidth:"90%", margin:"0 auto"}}/>
          </Carousel>
        </div>
        <div className={styles.resources_header}>
          <img className={styles.resources_icon} src='/LOGO/VSTREAM LOGO/VStreamLOGO_Circle.png'/>
          Free Resources
        </div>
        <div className={styles.content_header}>
          <Carousel className='carousel no-border' 
            wrapAround={true} slidesToShow={3} 
            style={{ maxWidth: "76rem", margin: "0 auto" }} cellSpacing={8}
            renderCenterLeftControls={({ previousSlide }) => (
              <button onClick={previousSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-left" /> */}
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button onClick={nextSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-right" /> */}
              </button>
            )}
          >
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 9.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 10.png' style={{margin:"1rem auto"}}/>
            </div>
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 11.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 12.png' style={{margin:"1rem auto"}}/>
            </div>
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 13.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 14.png' style={{margin:"1rem auto"}}/>
            </div>
          </Carousel>
        </div>
        <div className={styles.content_header_mobile}>
          <Carousel className='carousel no-border' 
            wrapAround={true} slidesToShow={1} 
            style={{ maxWidth: "76rem", margin: "0 auto" }} cellSpacing={8}
            renderCenterLeftControls={({ previousSlide }) => (
              <button onClick={previousSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-left" /> */}
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button onClick={nextSlide} style={{background: "transparent", border: "0px solid black"}}>
                <img src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                {/* <i className="fa fa-arrow-right" /> */}
              </button>
            )}
          >
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 9.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 10.png' style={{margin:"1rem auto"}}/>
            </div>
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 11.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 12.png' style={{margin:"1rem auto"}}/>
            </div>
            <div style={{maxWidth:"90%", margin:"0 auto"}}>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 13.png' style={{margin:"1rem auto"}}/>
              <img className={styles.resources_card} src='/Elements/RESOURCES PAGE/Frame 14.png' style={{margin:"1rem auto"}}/>
            </div>
          </Carousel>
        </div>
      </div>

      <div className={styles.contact_section}>
        <div className={styles.contact_logo}>
          <img src='/LOGO/VSTREAM LOGO/VStreamLOGO_Circle.png' style={{maxWidth:"150px", margin:"0 auto"}}/>
          <div className={styles.jacksonville_font}>VSTREAM</div>
        </div>
        <div className={styles.contact_info}>
          <div className={styles.contact_title}>VSTREAM MEDIA PTE LTD.</div>
          <div className={styles.contact_row}>
            <img src='/Icons/icon-08.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <div>hello@vstream.media</div>
          </div>
          <div className={styles.contact_row}>
            <img src='/Icons/icon-07.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <div>2 Gambas Crescent, Nordcom II Tower 2, #06-34 Singapore 757044</div>
          </div>
          <div className={styles.contact_row}>
            <img src='/Icons/socialmediaicon-09.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <img src='/Icons/socialmediaicon-12.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <img src='/Icons/socialmediaicon-11.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <div><button className={styles.cta_button}>SCHEDULE A MEETING</button></div>
          </div>
        </div>
      </div>

      <footer>
        <div>
          VSTREAM ©2023. All Rights Reserved. 
        </div>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 40px;
          /* border-top: 1px solid #eaeaea; */
          display: flex;
          justify-content: center;
          align-items: center;
          background: #C6C2C4;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
