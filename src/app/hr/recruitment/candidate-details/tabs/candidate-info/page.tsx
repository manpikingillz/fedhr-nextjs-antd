'use client';

import {
  DocxViewer,
  GoogleDocViewer,
  PdfIFrameViewer,
} from '@/app/components/FileViewer';

const CandidateInfo = () => {
  return (
    <>
      <PdfIFrameViewer src="/files/GilbertTwesigomweResume.pdf" />

      <p className='mt-8 text-lg'>Application Questions for this Job</p>

      <p className='mt-8 text-blue-500'>1. How did you hear about us?</p>
      <p className='mt-1 ml-4'>Through my friend Sam</p>

      <p className='mt-8 text-blue-500'>2. Why do you want to work here?</p>
      <p className='mt-1 ml-4'>I want to work for a company that values its employees as much as its customers.</p>

      <p className='mt-8 text-blue-500'>3. What can you bring to the company?</p>
      <p className='mt-1 ml-4'>Resourcefulness and a strong work ethic. I also have strong communication, teamwork, and negotiations skills.</p>

      <p className='mt-8 text-lg'>References</p>
      <p className='mt-4'>Sam Walker</p>
      <p className='mt-1'>Technology Company</p>
      <p className='mt-1'>0789 324 234</p>
    </>
  );
};

export default CandidateInfo;
