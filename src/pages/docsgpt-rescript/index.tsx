import * as React from 'react'
import styled from '@emotion/styled'
import { Main } from '../../components/layout/main'

const Button = styled.button({
  border: 'none',
  background: 'transparent',
  fontSize: '1.8em',

  '&:hover': {
    opacity: 0.3,
  },
})

interface Question {
  question: string
  apiKey: string
  apiHost: string
}

interface Answer {
  answer: string
}

async function submitQuestion({ question, apiKey, apiHost }: Question) {
  const response = await fetch(`${apiHost}/api/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      api_key: apiKey,
      embeddings_key: apiKey,
      history: null, // TODO
      active_docs: 'default',
    }),
  })

  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`)
  }

  const { answer } = (await response.json()) as Answer

  return answer
}

const DocsGptRescript = () => {
  const [apiKey, setApiKey] = React.useState('')
  const [apiHost, setApiHost] = React.useState('')
  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')

  return (
    <Main>
      <input
        placeholder="OpenAI API key"
        value={apiKey}
        onChange={event => setApiKey(event.target.value)}
      />
      <input
        placeholder="API host"
        value={apiHost}
        onChange={event => setApiHost(event.target.value)}
      />
      <textarea
        placeholder="Question"
        value={question}
        onChange={event => setQuestion(event.target.value)}
      />
      <Button
        type="button"
        onClick={() =>
          submitQuestion({ question, apiKey, apiHost }).then(setAnswer)
        }>
        Try me!
      </Button>
      <p>
        <strong>Answer:</strong> {answer}
      </p>
    </Main>
  )
}

export default DocsGptRescript
