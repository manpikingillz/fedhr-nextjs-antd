'use client'

import { DocxViewer, GoogleDocViewer, PdfIFrameViewer } from "@/app/components/FileViewer";

const CandidateInfo = () => {
    return <PdfIFrameViewer src="/files/GilbertTwesigomweResume.pdf"/>
}

export default CandidateInfo;