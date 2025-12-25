'use client'

import { IQuestion } from '@/store'
import React, { FC } from 'react'

type Props = {
    themeTitle: string
    question: IQuestion
}

const SvoyakCell: FC<Props> = (props) => {

  const {themeTitle, question} = props;

  return (
    <div className='border border-gray-500'>
      {question.title}
    </div>
  )
}

export default SvoyakCell
