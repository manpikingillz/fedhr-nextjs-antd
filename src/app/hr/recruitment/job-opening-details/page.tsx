'use client'

import React, { useState } from 'react'
import { Button, Row, Col, Divider, Card } from 'antd'
// import ReadMoreAndLess from 'react-read-more-less';
import { EditOutlined, BookOutlined, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import JobOpeningCandidates from './JobOpeningCandidates';


const JobDetail = () => {
    const [showFullDescription, setFullDescription] = useState(true);
    const router = useRouter()

    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
      };

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

    //     const jobDisplay = showFullDescription
    // ? htmlJobDisplay
    // : htmlJobDisplay.slice(0, 250);


        return (
            <div>
                <div className='cursor-pointer' onClick={() => router.back()}>
                    <span className='text-gray-500'>
                        <ArrowLeftOutlined />
                        &nbsp;
                        Job Openings
                    </span>
                </div>
                <h2 className='text-blue-500 mb-2 mt-4'>
                    <BookOutlined />
                    &nbsp;Software Engineer</h2>
                <span className='text-gray-500'>IT - Kampala, Central</span>
                <br />
                <br />

                <Row>
                    <Col span={16}>
                        <Button type="default" className='text-blue-500 font-bold border-blue-500'>Edit Job Opening</Button>
                    </Col>
                    <Col span={8}>
                        <div style={{ textAlign: 'right' }}>
                            <Row>
                                <Col span={12} className='flex flex-1 flex-row space-x-2'>
                                    <Avatar size="large" icon={<UserOutlined />} />

                                    <div className='flex flex-col items-start gap-2'>
                                        <span className='text-gray-500'>Hiring Lead</span>
                                        <span className='text-gray-950'>Twesigomwe Gilbert</span>
                                    </div>
                                </Col>

                                <Col span={6} className='flex flex-col items-start gap-2'>
                                    <span className='text-gray-500'>Status</span>
                                    <span className='text-gray-950'>Open</span>
                                </Col>
                                <Col span={6} className='flex flex-col items-start gap-2'>
                                    <span className='text-gray-500'>Open</span>
                                    <span className='text-gray-950'>100 days</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={16}>
                    <Col span={16}>
                        <Card className='bg-blue-100 border-blue-500'>
                            <Row>
                                <Col span={18}>
                                    <h1 className='text-blue-500'>
                                        <EditOutlined />
                                        &nbsp; Offer Pending!</h1>
                                    <span style={{ color: 'gray' }}>An offer was sent to Katusiime Rosette on Sep 4 (136 days ago).</span>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <Button type="default" className='text-gray-500 font-bold border-gray-400'>
                                        View Details
                                    </Button>
                                </Col>
                            </Row>

                        </Card>
                        <br />
                         <div dangerouslySetInnerHTML={{ __html: htmlJobDisplay }} className={`${showFullDescription ? 'mb-4 h-24 overflow-auto' : 'mb-4'}`} />
                         <button onClick={showFullDescriptionHandler}>
                            Read {showFullDescription ? "More" : "Less"}
                        </button>
                    </Col>
                    <Col span={8}>
                        <Card className='bg-zinc-100 text-center'>
                            <span>Take a look at your job listing</span>
                            <br />
                            <Button type="default" className='text-gray-500 font-bold bg-gray-200 border-grahy-200'
                            onClick={() => router.push('/jobs/job-details/1')}>
                                Preview Job Listing
                            </Button>
                        </Card>
                        <br />
                        {
                            showFullDescription ? '' :
                            <Card>
                            <span className='text-gray-500'>Location</span>
                            <br />
                            <span>Kampala, Uganda</span>
                            <Divider />

                            <span className='text-gray-500'>Department</span>
                            <br />
                            <span>IT</span>
                            <Divider />

                            <span className='text-gray-500'>Employment Type</span>
                            <br />
                            <span>Full-Time</span>
                            <Divider />

                            <span className='text-gray-500'>Minimum Experience</span>
                            <br />
                            <span>Experienced</span>
                        </Card>
                        }
                    </Col>
                </Row>

                <div className='mt-4'>
                    <JobOpeningCandidates />
                </div>

            </div>
        );
    }

export default JobDetail