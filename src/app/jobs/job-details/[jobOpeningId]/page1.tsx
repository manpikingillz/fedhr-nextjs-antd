'use client'

import { Row, Col, Button, Card, Divider } from "antd"
import Link from "next/link"

const JobDetails = () => {
    return  <div>
    <Row style={{ marginTop: '3em' }}>
        <Col span={10} offset={2} style={{ textAlign: 'left' }}>
            <h1 style={{ color: '#0093ff', fontSize: '2.5em', fontWeight: 'bold' }}>
                {/* <Icon type="alert" theme="filled" /> */}
                &nbsp;FedSpar</h1>
        </Col>
        <Col span={10} style={{ textAlign: 'right' }}>
            <Button type="default" style={{color: '#007DCE', borderColor: 'gray'}}>
                {/* <Icon type="linkedin" style={{fontSize: '1.2em'}} /> */}
                i
            </Button>
            &nbsp;
            <Button type="default" style={{color: '#0096FF', borderColor: 'gray'}}>
                {/* <Icon type="twitter" style={{fontSize: '1.2em'}} /> */}
                i
            </Button>
            &nbsp;
            <Button type="default" style={{color: '#005A97', borderColor: 'gray'}}>
                {/* <Icon type="facebook" style={{fontSize: '1.2em'}} /> */}
                i
            </Button>
        </Col>
    </Row>
    <Row>
        <Col span={20} offset={2}>
            <Card>
                <span style={{ color: '#007BCE', fontSize: '1.8em', fontWeight: 'bold' }}>Current Openings</span>
                <br />
                <span style={{ color: 'gray', fontSize: '1.2em' }}>Thanks for checking out our job openings. See something that interests you? Apply here.</span>
                <Divider />
                <Row>
                    <Col span={24}>
                    <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>IT</h1>
                        </Col>
                
                    <Col span={12}>
                        <h1 style={{ color: '#007BCE', fontSize: '1.5em' }}>
                           <Link href="/published-job-detail">IT Security Engineer</Link>
                            
                        </h1>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>Kampala</h1>
                        <span style={{ color: 'gray' }}>Uganda</span>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>
                            {/* <Icon type="team" /> */}
                            &nbsp;IT</h1>
                        <span style={{ color: 'gray' }}>Full-Time</span>
                    </Col>
                </Row>
                <Divider/>

                <Row>
                    <Col span={24}>
                    <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>HR</h1>
                        </Col>
                
                    <Col span={12}>
                        <h1 style={{ color: '#007BCE', fontSize: '1.5em' }}>
                            <Link href="/published-job-detail">HR Officer</Link>
                        </h1>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>Kampala</h1>
                        <span style={{ color: 'gray' }}>Uganda</span>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}
                        >
                            {/* <Icon type="team" /> */}
                        &nbsp;HR</h1>
                        <span style={{ color: 'gray' }}>Full-Time</span>
                    </Col>
                </Row>
                <Divider/>

                <Row>
                    <Col span={24}>
                    <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>Finance</h1>
                        </Col>
                
                    <Col span={12}>
                        <h1 style={{ color: '#007BCE', fontSize: '1.5em' }}>
                            <Link href="/published-job-detail">Accountant</Link>
                        </h1>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>Kampala</h1>
                        <span style={{ color: 'gray' }}>Uganda</span>
                    </Col>
                    <Col span={6}>
                        <h1 style={{ color: '#5F5F5F', fontSize: '1.1em' }}>
                            {/* <Icon type="team" /> */}
                            &nbsp;Finance</h1>
                        <span style={{ color: 'gray' }}>Full-Time</span>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
</div>
}

export default JobDetails