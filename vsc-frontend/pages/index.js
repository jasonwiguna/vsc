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
  monthly: 'monthly',
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
  [paramMap.monthly]: Yup.boolean().required(),
  [paramMap.subscriptionDate]: Yup.string().required(),
  [paramMap.expirationDate]: Yup.string().required(),
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
  monthly: true,
  subscriptionDate: new Date(),
  expirationDate: new Date(new Date().setMonth(new Date().getMonth()+1)),
}

export default function Home() {
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

  const projectsPath = [
    ['/Images Carousell/VStream1.png','/Images Carousell/VStream2.png','/Images Carousell/VStream3.png'],
    ['/Images Carousell/VStream4.jpg','/Images Carousell/VStream5.jpg','/Images Carousell/VStream6.jpg','/Images Carousell/VStream7.jpeg'],
    ['/Images Carousell/VStream8.png','/Images Carousell/VStream9.png','/Images Carousell/VStream10.png'],
    ['/Images Carousell/VStream11.jpeg','/Images Carousell/VStream12.png','/Images Carousell/VStream13.png','/Images Carousell/VStream14.jpg'],
    ['/Images Carousell/VStream15.png','/Images Carousell/VStream16.png','/Images Carousell/VStream17.png'],
    ['/Images Carousell/VStream18.jpg','/Images Carousell/VStream19.png','/Images Carousell/VStream20.png','/Images Carousell/VStream21.png'],
    ['/Images Carousell/VStream22.png','/Images Carousell/VStream23.jpeg','/Images Carousell/VStream24.png'],
    ['/Images Carousell/VStream25.png','/Images Carousell/VStream26.png','/Images Carousell/VStream27.png','/Images Carousell/VStream28.jpg'],
    ['/Images Carousell/VStream29.png','/Images Carousell/VStream30.png','/Images Carousell/VStream31.jpg'],
    ['/Images Carousell/VStream32.jpg','/Images Carousell/VStream33.jpg','/Images Carousell/VStream34.jpg','/Images Carousell/VStream35.jpg'],
    ['/Images Carousell/VStream36.jpeg','/Images Carousell/VStream37.jpeg','/Images Carousell/VStream38.jpg']
  ]
  
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
        <h1 className={styles.title_card}>
          <div>
            AV over IP technology <span style={{ color: '#aed673' }}>Solution Provider</span>
          </div>
          <div>
            Hybrid video streaming partner
          </div>
        </h1>
      </div>

      <div id='about' className={styles.about_section}>
        <div className={styles.section_card}>
          <h1 className={styles.card_header}>
            VSTREAM
          </h1>
          <div className={styles.card_content}>
            VStream provides support in the technical planning and designing of broadcast workflows;
            Training teams and organizations that wish to move to the next level in their productions
            and educating the next generation of bright minds in the new age of broadcast technology.
          </div>
          <div className={styles.card_content}>
            We are committed to installing and equipping our clients and end-users with the latest
            broadcast technologies and equipment according to their ever-changing needs and requirements.
            Our workflow is structured around the usage of AV-Over-IP (AVoIP) protocols such as NDI and Dante.
          </div>
          <div className={styles.card_content}>
            With the use of the latest Pan-Tilt-Zoom cameras, Visual Storytelling is made accessible and intuitive
            no matter the size and complexity of a production regardless if the camera operators are
            physically or remotely present.
          </div>
          <div className={styles.card_content}v>
            With everything connected to one another over a single or multi-node network,
            we pride ourselves in making the management of productions efficient and simple
            through the integration of every system component using AVoIP protocols and software.
          </div>
        </div>
      </div>

      <div id='resources' className={styles.info_section}>
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
          <img src='/Elements/ENTITY/VSTREAMACADEMY.png' style={{maxWidth:"70%", margin:"0 auto"}}/>
          <img src='/Elements/ENTITY/VSTREAMINDONESIA.png' style={{maxWidth:"70%", margin:"0 auto"}}/>
          <img src='/Elements/ENTITY/VSTREAMTHAILAND.png' style={{maxWidth:"70%", margin:"0 auto"}}/>
          <img src='/Elements/ENTITY/VSTREAMACADEMY.png' style={{maxWidth:"70%", margin:"0 auto"}}/>
          <img src='/Elements/ENTITY/VSTREAMCONNECT.png' style={{maxWidth:"70%", margin:"0 auto"}}/>
        </Carousel>
        <div className={styles.info_card}>
          <div>
            VSTREAM ACADEMY is ...
          </div>
        </div>
        <div className={styles.info_content}>
          <h1 className={styles.content_header}>
            <div className={styles.jacksonville_font}>
              OUR PAST PROJECTS
            </div>
            {projectsPath.map((item) => {
              return <div key={item} className={styles.info}>
                {item.map((i) => {
                  return <div key={i}>
                    <img className={styles.info_project} src={i}/>
                  </div>
                })}
              </div>
            })}
          </h1>
          <h1 className={styles.content_header_mobile}>
            <div className={styles.jacksonville_font}>
              OUR PAST PROJECTS
            </div>
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
              renderBottomCenterControls={() => {
                return null
              }}
            >
              {projectsPath.map((item) => {
                return item.map((i) => {
                  return <div key={i} className={styles.info}>
                    <div>
                      <img className={styles.info_project} src={i}/>
                    </div>
                  </div>
                })}
              )}
            </Carousel>
          </h1>
        </div>
        <div id='partners' className={styles.info_content}>
          <h1 className={styles.content_header}>
            <div className={styles.jacksonville_font}>
              OUR PARTNERS
            </div>
            <div className={styles.info}>
              <div className={styles.info_image_container}>
                <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/2560px-NewTek_logo.svg.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/seervision-logo-1.png'/>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.info_image_container}>
                <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/Canon-Logo.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/NicePng_dog-logo-png_3546575.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/千视-LOGO标准-1.png'/>
              </div>
            </div>
          </h1>
          <h1 className={styles.content_header_mobile}>
            <div className={styles.jacksonville_font}>
              OUR PARTNERS
            </div>
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
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/2560px-NewTek_logo.svg.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/seervision-logo-1.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/Canon-Logo.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/NicePng_dog-logo-png_3546575.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img className={styles.info_image} src='/LOGO/PARTNERS LOGO/千视-LOGO标准-1.png'/>
                </div>
              </div>
            </Carousel>
          </h1>
        </div>
      </div>

      <div id='contact' className={styles.cta_section}>
        <img onClick={handleOpen} src='/Elements/cta.png' style={{width:"100%", margin:"0 auto"}}/>
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
                              {pricing.packageName} for ${pricing.monthlyPrice} per month
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
