'use client'

import { Row, Col, Button, Card, Divider, Affix, Input, Form, Select, DatePicker } from 'antd'
import Link from "next/link"
import { useState } from 'react';
import './job-details.scss'
import { CheckCircleOutlined, DoubleLeftOutlined, AlertOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;


const PublishedJobDetail  = () => {
    const [showApplyForm, setShowApplyForm] = useState(false);

    const onJobViewDescription = () => {
        setShowApplyForm(false)
    }

    const onApplyForJob = () => {
        setShowApplyForm(true)
    }

    const htmlJobDisplay = `
        <p style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <b style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline;">About Us</b>
</p>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;"><span style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-family: &quot;Source Sans Pro&quot;, Arial, Helvetica, sans-serif;">Our mission is simple: we want to set people free to do meaningful work. People love our software--and it turns out that people love working here too. We’ve been recognized as a “Best Company to Work For”, and we’re proud of our team for receiving awards for workplace effectiveness and flexibility.</span></p>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">What You'll Do</strong></p>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">Our ideal Sr. Software Engineer/Developer (with experience in PHP, Perl, Python or Ruby) will&nbsp;be an integral contributor to the current and next generation of our APP<strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">.</strong>&nbsp; You'll be working on multiple projects to continue making us the #1 HR Software for SMB business. &nbsp;If you get a kick out of solving problems and building beautiful world class software, then you will love BambooHR.</p>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">You will:</p>
<ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 30px !important; padding: 0px 0px 10px; border: 0px; outline: 0px; vertical-align: baseline; list-style-position: outside !important; list-style-image: initial; list-style-type: disc; display: block; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Write code for backend processes, RESTful public web API's, and, of course, our industry leading website.</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Research technologies and engineer complete solutions to problems.</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Propose and implement performance optimizations and scaling strategies.</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Work with the rest of the team to integrate your projects into the application.</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Contribute to the ongoing improvement of our systems and processes.</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Come to work, do great things, then go home!</li>
</ul>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">What You Need to Get the Job Done (Minimum Qualifications)</strong></p>
<ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 30px !important; padding: 0px 0px 10px; border: 0px; outline: 0px; vertical-align: baseline; list-style-position: outside !important; list-style-image: initial; list-style-type: disc; display: block; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">5+ years experience in web development</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Experience in PHP, HTML, XML, JavaScript, CSS</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Object Oriented development</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">MySQL - both SQL query language and database structure/design</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Version control software, preferably Mercurial or Git</li>
</ul>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">What Will Make Us REALLY Love you (Preferred Qualifications)</strong></p>
<ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 30px !important; padding: 0px 0px 10px; border: 0px; outline: 0px; vertical-align: baseline; list-style-position: outside !important; list-style-image: initial; list-style-type: disc; display: block; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Additional C/C++&nbsp;experience a plus</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">You can show that you'd be an excellent communicator with our Javascript developers and UI Designers</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">You have a friendly willingness to compromise and play nice with others</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">We can see that you have a service-minded attitude</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;">Real world examples of demonstrated technical leadership</li>
</ul>
<p style="margin: 1em 0px 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: block; margin-block-start: 1em; margin-block-end: 0px; margin-inline-start: 0px; margin-inline-end: 0px; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <b style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline;">What You'll Love About Us</b>
</p>
<ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 30px !important; padding: 0px 0px 10px; border: 0px; outline: 0px; vertical-align: baseline; list-style-position: outside !important; list-style-image: initial; list-style-type: disc; display: block; color: rgb(34, 34, 34); font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; font-family: &quot;source sans pro&quot;;">
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">Great Company Culture.&nbsp;</strong>Business Best Companies to Work For (2013 &amp; 2014) and the Sloan Award for Business Excellence in Workplace Effectiveness and Flexibility (2013 &amp; 2014)</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">Work that Stays at Work.&nbsp;</strong>Genuine work/life balance served here!</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">Rest and Relaxation.&nbsp;</strong>3 weeks paid time off, 11 paid holidays, and <em style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline;">we pay you to go on vacation</em> (ask us about this!)</li>
  <li style="margin: 0px 0px 5px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; display: list-item; text-align: -webkit-match-parent;"><strong style="margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-weight: 700;">Health Benefits.&nbsp;</strong>Medical with HSA and FSA options, dental, and vision</li>
</ul>
        `



        return (
            <div className=' h-min'>
                <Row className='pt-10'>
                    <Col span={20} offset={2} style={{ textAlign: 'left' }}>
                        <h1 className='text-blue-500 text-2xl font-bold mt-2 mb-6'>
                            <AlertOutlined />
                            &nbsp;Smooth HR</h1>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14} offset={2}>
                        <Card>
                            <Link href="/jobs">
                                <span style={{ color: 'gray' }}>
                                    <ArrowLeftOutlined />
                                    &nbsp;
                                    Job Openings</span>
                            </Link>
                            <br />
                            <span className='text-blue-500 text-xl font-bold mb-2'>Software Engineer</span>
                            <br />
                            <span style={{ color: 'gray', fontSize: '1.2em' }}>IT. Kampala, Uganda</span>
                            <Divider />

                            {
                                showApplyForm === false ?
                                    <div dangerouslySetInnerHTML={{ __html: htmlJobDisplay }} />
                                    :
                                    <div>
                                        <p className='text-blue-500 text-xl mb-2'>Apply for this Position</p>
                                        <Form name='job-details-form' layout='vertical'>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item label="First Name"
                                                    rules={[{ required: true, message: 'Please fill in First Name.' }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Last Name"
                                                     rules={[{ required: true, message: 'Please fill in Last Name.' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item label="Email"
                                                    rules={[{ required: true, message: 'Please fill in First Name.' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Phone"
                                                    rules={[{ required: true , message: 'Please fill in your Phone Number'}]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item label="Address"
                                                    rules={[{ required: true, message: 'Please fill in your address.' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item label="City"
                                                    rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label="province"
                                                    rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label="zipCode"
                                                    rules={[{ required: false }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Country"
                                                    rules={[{ required: false }]}>
                                                        <Select placeholder="Select">
                                                                    <Option key="1" value="Uganda">Uganda</Option>
                                                                    <Option key="2" value="Kenya">Kenya</Option>
                                                                </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Divider />

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Cover Letter"
                                                    rules={[{ required: false }]}>
                                                        <Button type="default">Choose File</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Resume"
                                                    rules={[{ required: false }]}>
                                                        <Button type="default">Choose File</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Date Available"
                                                    rules={[{ required: false }]}>
                                                        <DatePicker />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Desired Pay"
                                                    rules={[{ required: false }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Divider />

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Website, Blog, or Portfolio"
                                                    rules={[{ required: false }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="LinkedIn Profile URL"
                                                    rules={[{ required: false }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Divider />

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="Who referred you for this position?"
                                                    rules={[{ required: false }]}>
                                                         <TextArea />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="References (Name, Company, and Contact Info)"
                                                    rules={[{ required: false }]}>
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item label="How did you hear about this position?"
                                                    rules={[{ required: false }]}>
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    
                                                </Col>
                                            </Row>

                                        </Form>
                                        <Affix offsetBottom={0} >
                                            <Card style={{ backgroundColor: '#414141' }}>
                                                <Button type="primary" size="large" >
                                                <CheckCircleOutlined />
                                                Submit Application
                                                </Button>
                                                <Button type="link" size="large" style={{color: '#ffffff'}} onClick={onJobViewDescription}>
                                                    Cancel
                                                </Button>
                                            </Card>
                                        </Affix>
                                    </div>
                            }
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Affix offsetTop={10}>
                            <Card className='mb-2'>
                                {
                                    showApplyForm === false ?
                                        <Button onClick={onApplyForJob} type="primary" size="large" className='text-2xl font-bold mb-2 w-full'>
                                            Apply for this Job
                                        </Button>
                                        :
                                        <Button onClick={onJobViewDescription} type="default" size="large" className='text-blue-500 text-2xl font-bold mb-2 w-full border-blue-500'>
                                            <DoubleLeftOutlined /> View Description
                                        </Button>
                                }
                            </Card>
                            <Card className='bg-zinc-100'>
                                <span style={{ color: 'gray' }}>Location</span>
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Kampala, Uganda</span>
                                <Divider />

                                <span style={{ color: 'gray' }}>Department</span>
                                <br />
                                <span style={{ fontWeight: 'bold' }}>IT</span>
                                <Divider />

                                <span style={{ color: 'gray' }}>Employment Type</span>
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Full-Time</span>
                                <Divider />

                                <span style={{ color: 'gray' }}>Minimum Experience</span>
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Manager/Supervisor</span>
                                <Divider />

                                <span style={{ color: 'gray' }}>Compensation</span>
                                <br />
                                <span style={{ fontWeight: 'bold' }}>$80,000 per year</span>
                                <Divider />

                            </Card>
                        </Affix>
                    </Col>
                </Row>
            </div>
        );

}

export default PublishedJobDetail;
