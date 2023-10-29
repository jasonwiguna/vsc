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
      handleClose()
    },
    onError: () => setSubmissionStatus(statusMap.ERROR),
  })
  const permission = <div>I agree to receive updates</div>

  const projectsPath = [
    ['/Images_Carousell/VStream1.png','/Images_Carousell/VStream2.png','/Images_Carousell/VStream3.png'],
    ['/Images_Carousell/VStream4.jpg','/Images_Carousell/VStream5.jpg','/Images_Carousell/VStream6.jpg','/Images_Carousell/VStream7.jpeg'],
    ['/Images_Carousell/VStream8.png','/Images_Carousell/VStream9.png','/Images_Carousell/VStream10.png'],
    ['/Images_Carousell/VStream11.jpeg','/Images_Carousell/VStream12.png','/Images_Carousell/VStream13.png','/Images_Carousell/VStream14.jpg'],
    ['/Images_Carousell/VStream15.png','/Images_Carousell/VStream16.png','/Images_Carousell/VStream17.png'],
    ['/Images_Carousell/VStream18.jpg','/Images_Carousell/VStream19.png','/Images_Carousell/VStream20.png','/Images_Carousell/VStream21.png'],
    ['/Images_Carousell/VStream22.png','/Images_Carousell/VStream23.jpeg','/Images_Carousell/VStream24.png'],
    ['/Images_Carousell/VStream25.png','/Images_Carousell/VStream26.png','/Images_Carousell/VStream27.png','/Images_Carousell/VStream28.jpg'],
    ['/Images_Carousell/VStream29.png','/Images_Carousell/VStream30.png','/Images_Carousell/VStream31.jpg'],
    ['/Images_Carousell/VStream32.jpg','/Images_Carousell/VStream33.jpg','/Images_Carousell/VStream34.jpg','/Images_Carousell/VStream35.jpg'],
    ['/Images_Carousell/VStream36.jpeg','/Images_Carousell/VStream37.jpeg','/Images_Carousell/VStream38.jpg']
  ]

  const imagesPath = [
    '/Images_Carousell/VStream1.png','/Images_Carousell/VStream2.png','/Images_Carousell/VStream3.png',
    '/Images_Carousell/VStream4.jpg','/Images_Carousell/VStream5.jpg','/Images_Carousell/VStream6.jpg','/Images_Carousell/VStream7.jpeg',
    '/Images_Carousell/VStream8.png','/Images_Carousell/VStream9.png','/Images_Carousell/VStream10.png',
    '/Images_Carousell/VStream11.jpeg','/Images_Carousell/VStream12.png','/Images_Carousell/VStream13.png','/Images_Carousell/VStream14.jpg',
    '/Images_Carousell/VStream15.png','/Images_Carousell/VStream16.png','/Images_Carousell/VStream17.png',
    '/Images_Carousell/VStream18.jpg','/Images_Carousell/VStream19.png',
    '/Images_Carousell/VStream20.png','/Images_Carousell/VStream21.png',
    '/Images_Carousell/VStream22.png','/Images_Carousell/VStream23.jpeg','/Images_Carousell/VStream24.png',
    '/Images_Carousell/VStream25.png','/Images_Carousell/VStream26.png','/Images_Carousell/VStream27.png','/Images_Carousell/VStream28.jpg',
    '/Images_Carousell/VStream29.png','/Images_Carousell/VStream30.png','/Images_Carousell/VStream31.jpg',
    '/Images_Carousell/VStream32.jpg','/Images_Carousell/VStream33.jpg','/Images_Carousell/VStream34.jpg','/Images_Carousell/VStream35.jpg',
    '/Images_Carousell/VStream36.jpeg','/Images_Carousell/VStream37.jpeg','/Images_Carousell/VStream38.jpg',
  ]

  const imagesPath1 = [
    '/Images_Carousell/VStream1.png','/Images_Carousell/VStream2.png','/Images_Carousell/VStream3.png',
    '/Images_Carousell/VStream4.jpg','/Images_Carousell/VStream5.jpg','/Images_Carousell/VStream6.jpg','/Images_Carousell/VStream7.jpeg',
    '/Images_Carousell/VStream8.png','/Images_Carousell/VStream9.png','/Images_Carousell/VStream10.png',
    '/Images_Carousell/VStream11.jpeg','/Images_Carousell/VStream12.png','/Images_Carousell/VStream13.png','/Images_Carousell/VStream14.jpg',
    '/Images_Carousell/VStream15.png','/Images_Carousell/VStream16.png','/Images_Carousell/VStream17.png',
    '/Images_Carousell/VStream18.jpg','/Images_Carousell/VStream19.png',
    '/Images_Carousell/VStream1.png','/Images_Carousell/VStream2.png','/Images_Carousell/VStream3.png',
    '/Images_Carousell/VStream4.jpg','/Images_Carousell/VStream5.jpg','/Images_Carousell/VStream6.jpg','/Images_Carousell/VStream7.jpeg'
  ]

  const imagesPath2 = [
    '/Images_Carousell/VStream20.png','/Images_Carousell/VStream21.png',
    '/Images_Carousell/VStream22.png','/Images_Carousell/VStream23.jpeg','/Images_Carousell/VStream24.png',
    '/Images_Carousell/VStream25.png','/Images_Carousell/VStream26.png','/Images_Carousell/VStream27.png','/Images_Carousell/VStream28.jpg',
    '/Images_Carousell/VStream29.png','/Images_Carousell/VStream30.png','/Images_Carousell/VStream31.jpg',
    '/Images_Carousell/VStream32.jpg','/Images_Carousell/VStream33.jpg','/Images_Carousell/VStream34.jpg','/Images_Carousell/VStream35.jpg',
    '/Images_Carousell/VStream36.jpeg','/Images_Carousell/VStream37.jpeg','/Images_Carousell/VStream38.jpg',
    '/Images_Carousell/VStream20.png','/Images_Carousell/VStream21.png',
    '/Images_Carousell/VStream22.png','/Images_Carousell/VStream23.jpeg','/Images_Carousell/VStream24.png',
    '/Images_Carousell/VStream25.png','/Images_Carousell/VStream26.png'
  ]

  const content = [{
    path: '/Elements/ENTITY/VSTREAMACADEMY.png',
    message: 'Your gateway to a world of knowledge and expertise in Webcasting, Broadcast Technology, Hybrid Workflows and AV-Over-IP (AVoIP). With our extensive experience and unwavering passion for the industry, we have embarked on a mission to share our insights and equip individuals  with the skills required to conquer the ever-changing technological landscape. Join us at VStream Academy as we empower the industry and anyone seeking to master the art of Broadcast, Webcasting, Video Technology, Hybrid Workflows and AVoIP, shaping a brighter future through education and expertise.'
  },{
    path: '/Elements/ENTITY/VSTREAMSINGAPORE.png',
    message: 'VStream Media: Your Partner in Transforming Hybrid Workflows. Our dedicated team excels in meticulously planning and executing hybrid workflows, enabling teams and organizations to take their productions to the next level. We are committed to equipping our clients with the latest in hybrid technology and equipment, custom-tailored to their ever-evolving needs.\n\nAt the heart of it all is the Newtek TriCaster, a versatile Video Mixing and Live Streaming system. It seamlessly integrates physical and remote sources, making your hybrid productions truly exceptional. What sets us apart is our unwavering commitment to efficiency through the seamless integration of system components using AVoIP protocols and software. Experience a new level of efficiency, innovation, and excellence with VStream Media.'
  },{
    path: '/Elements/ENTITY/VSTREAMINDONESIA.png',
    message: 'VStream Media: Mitra Anda dalam Memaksimalkan Alur Kerja Hybrid. Tim kami ahli dalam merencanakan dan menjalankan alur kerja hybrid dengan cermat yang memungkinkan perusahaan dan organisasi untuk membawa acara mereka ke tingkat berikutnya. Kami berkomitmen untuk melengkapi klien kami dengan teknologi dan peralatan hybrid terbaru yang disesuaikan dengan kebutuhan yang selalu berkembang.\n\nHal yang membedakan kami adalah komitmen tak berkesudahan kami terhadap efisiensi melalui integrasi yang mulus dari komponen sistem menggunakan protokol AVoIP dan perangkat lunak. Rasakan tingkat efisiensi, inovasi, dan keunggulan baru dengan VStream Media.'
  },{
    path: '/Elements/ENTITY/VSTREAMTHAILAND.png',
    message: 'VStream Media: พันธมิตรของคุณในการเปลี่ยนแปลง Hybrid Workflows ที่ประสบความสำเร็จอย่างพิถีพิถัน ทีมงานของเรามุ่งสู่การวางแผนและดำเนินการ Hybrid Workflows โดยใส่ใจในรายละเอียด ซึ่งช่วยให้ทีมงานและองค์กรสามารถพัฒนาการผลิตของพวกเขาไปสู่ระดับถัดไปได้อย่างมีประสิทธิภาพ\n\nเรามุ่งมั่นที่จะจัดให้ลูกค้าของเราได้รับการสนับสนุนด้วยเทคโนโลยีและอุปกรณ์ Hybrid ล่าสุดที่ปรับแต่งให้ตรงตามความต้องการที่เปลี่ยนแปลงอยู่เสมอ\n\nที่ใจกลางของทุกสิ่งคือ Newtek TriCaster, ระบบการผสมวิดีโอและสตรีมสดที่หลากหลาย มันทำการผสมรวมทรัพยากรที่อยู่ห่างหากและใกล้กันได้อย่างไร้ปัญหา ทำให้ Hybrid Productions ของคุณเป็นเรื่องพิเศษอย่างแท้จริง\n\nสิ่งที่ทำให้เราโดดเด่นคือความมุ่งมั่นที่ไม่รู้จบในการเพิ่มประสิทธิภาพผ่านการรวมอุปกรณ์ระบบได้อย่างเรียบง่ายโดยใช้โปรโตคอล AVoIP และซอฟต์แวร์ มาสัมผัสระดับใหม่ของประสิทธิภาพ นวัส และความยอดเยี่ยมกับ VStream Media'
  },{
    path: '/Elements/ENTITY/VStreamSolutions.png',
    message: 'VStream Solutions is the Research & Development arm of VStream Asia, where ideas and explored and problems are tackled by creating innovative solutions and pushing the boundaries of what is possible. Our team of innovators aim to create workflows that are more efficient, streamlined and tap onto the latest technologies to develop what we truly believe will enable anyone to do more - By creating Solutions.'
  }]

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  const [imgidx, setImgIdx] = useState(0);
  const [isOpenImg, setIsOpenImg] = useState(false)

  function handleOpenImg() {
    setIsOpenImg(true)
  }
  function handleCloseImg() {
    setIsOpenImg(false)
  }

  let carousel;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % content.length;
    setCurrentIndex(nextIndex);
    carousel.goToSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + content.length) % content.length;
    setCurrentIndex(prevIndex);
    carousel.goToSlide(prevIndex);
  };
  
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
          <div className={styles.card_content}>
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
            <button onClick={handlePrev} style={{background: "transparent", border: "0px solid black"}}>
              <img loading="lazy" className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
              {/* <i className="fa fa-arrow-left" /> */}
            </button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button onClick={handleNext} style={{background: "transparent", border: "0px solid black"}}>
              <img loading="lazy" src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
              {/* <i className="fa fa-arrow-right" /> */}
            </button>
          )}
          afterSlide={(slideIndex) => {
            // Update the state when a slide changes
            setCurrentIndex(slideIndex);
          }}
          ref={(c) => {
            carousel = c;
          }}
          renderBottomCenterControls={() => {
            return null
          }}
        >
          {content.map((c, key) => {
            return <img loading="lazy" key={key} index={key} src={c.path} style={{maxWidth:"70%", margin:"0 auto"}}/>
          })}
        </Carousel>
        <div className={styles.info_card}>
          <div style={{ whiteSpace: 'pre-line' }}>
            {content[currentIndex].message}
          </div>
        </div>
        <div className={styles.info_content}>
          <h1 className={styles.content_header}>
            <div className={styles.jacksonville_font}>
              OUR PAST PROJECTS
            </div>
            <div className={`${styles.filmstrip} ${isPaused1 ? styles.paused : ''}`}
              onMouseEnter={() => setIsPaused1(true)}
              onMouseLeave={() => setIsPaused1(false)}
            >
              {imagesPath1.map((image, index) => (
                <img loading="lazy" onClick={() => {
                  setImgIdx(index)
                  setIsOpenImg(true)
                }} key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
            <div className={`${styles.filmstrip_reverse} ${isPaused2 ? styles.paused : ''}`}
              onMouseEnter={() => setIsPaused2(true)}
              onMouseLeave={() => setIsPaused2(false)}
            >
              {imagesPath2.map((image, index) => (
                <img loading="lazy" onClick={() => {
                  setImgIdx(index + 19)
                  setIsOpenImg(true)
                }} key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
            <Modal show={isOpenImg} onHide={handleCloseImg} size='lg' centered>
              <Modal.Body className={styles.modal}>
                <div className={styles.modalContainerImg}>
                  <button disabled={imgidx == 0} onClick={() => setImgIdx(Math.max(imgidx - 1, 0))} style={{background: "transparent", border: "0px solid black"}}>
                    <img loading="lazy" className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto", opacity: imgidx == 0 ? '30%' : '100%'}}/>
                  </button>
                  <img loading="lazy" style={{ maxWidth: '80%' }} src={imagesPath[imgidx]} alt={`Image`} />
                  <button disabled={imgidx == imagesPath.length - 1} onClick={() => setImgIdx(Math.min(imgidx + 1, imagesPath.length - 1))} style={{background: "transparent", border: "0px solid black"}}>
                    <img loading="lazy" src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto", opacity: imgidx == imagesPath.length - 1 ? '30%' : '100%'}}/>
                  </button>
                </div>
              </Modal.Body>
            </Modal>
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
                  <img loading="lazy" className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                  {/* <i className="fa fa-arrow-left" /> */}
                </button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide} style={{background: "transparent", border: "0px solid black"}}>
                  <img loading="lazy" src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
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
                      <img loading="lazy" className={styles.info_project} src={i}/>
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
                <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/vzrt.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/RT_logo.png'/>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.info_image_container}>
                <img loading="lazy" className={styles.info_image_canon} src='/LOGO/PARTNERS LOGO/Canon-Logo.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/NicePng_dog-logo-png_3546575.png'/>
              </div>
              <div className={styles.info_image_container}>
                <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/千视-LOGO标准-1.png'/>
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
                  <img loading="lazy" className={styles.flip} src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                  {/* <i className="fa fa-arrow-left" /> */}
                </button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide} style={{background: "transparent", border: "0px solid black"}}>
                  <img loading="lazy" src='/Elements/shadowarrow-01.png' style={{maxWidth:"50px", margin:"0 auto"}}/>
                  {/* <i className="fa fa-arrow-right" /> */}
                </button>
              )}
              renderBottomCenterControls={() => {
                return null
              }}
            >
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/vzrt.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/RT_logo.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/Canon-Logo.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/NicePng_dog-logo-png_3546575.png'/>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info_image_container}>
                  <img loading="lazy" className={styles.info_image} src='/LOGO/PARTNERS LOGO/千视-LOGO标准-1.png'/>
                </div>
              </div>
            </Carousel>
          </h1>
        </div>
      </div>

      <div className={styles.cta_section}>
        <img loading="lazy" onClick={handleOpen} src='/Elements/cta.png' style={{width:"100%", margin:"0 auto"}}/>
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

      <div id='contact' className={styles.contact_section}>
        <div className={styles.contact_logo}>
          <img loading="lazy" src='/LOGO/VSTREAM LOGO/VSTREAMASIA.png' style={{maxWidth:"220px", margin:"0 auto"}}/>
          {/* <div className={styles.jacksonville_font}>VSTREAM ASIA</div> */}
        </div>
        <div className={styles.contact_info}>
          <div className={styles.contact_title}>VSTREAM ASIA</div>
          <div className={styles.contact_row}>
            <img loading="lazy" src='/Icons/icon-08.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <div>hello@vstream.asia</div>
          </div>
          <div className={styles.contact_row}>
            <img loading="lazy" src='/Icons/icon-07.png' style={{maxWidth:"40px", marginRight: "3px"}}/>
            <div>2 Gambas Crescent, Nordcom II Tower 2, #06-34 Singapore 757044</div>
          </div>
          <div className={styles.contact_row}>
            <a href='https://www.facebook.com/VSTREAMMEDIA/' target='_blank' rel='noreferrer'><img loading="lazy" src='/Icons/socialmediaicon-09.png' style={{maxWidth:"40px", marginRight: "3px"}}/></a>
            <a href='https://instagram.com/vstreammedia' target='_blank' rel='noreferrer'><img loading="lazy" src='/Icons/socialmediaicon-12.png' style={{maxWidth:"40px", marginRight: "3px"}}/></a>
            <a href='https://www.linkedin.com/company/vstreammedia/' target='_blank' rel='noreferrer'><img loading="lazy" src='/Icons/socialmediaicon-11.png' style={{maxWidth:"40px", marginRight: "3px"}}/></a>
            <a href='http://bookme.name/vstream' target='_blank' rel='noreferrer'><div><button className={styles.cta_button}>SCHEDULE A MEETING</button></div></a>
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
