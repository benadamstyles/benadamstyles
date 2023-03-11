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

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
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

interface Query<Data> {
  data: Data
  loading: boolean
  error: Error | undefined
}

const DocsGptRescript = () => {
  const [apiKey, setApiKey] = React.useState('')
  const [apiHost, setApiHost] = React.useState('')
  const [question, setQuestion] = React.useState('')

  const [{ data, loading, error }, setQuery] = React.useState<Query<string>>({
    data: '',
    loading: false,
    error: undefined,
  })

  return (
    <Main>
      <Form
        onSubmit={event => {
          event.preventDefault()
          setQuery(prev => ({ ...prev, loading: true }))
          submitQuestion({ question, apiKey, apiHost })
            .then(answer =>
              setQuery(prev => ({ ...prev, loading: false, data: answer }))
            )
            .catch((err: Error) =>
              setQuery(prev => ({ ...prev, loading: false, error: err }))
            )
        }}>
        <div>
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
        </div>
        <textarea
          placeholder="Question"
          value={question}
          onChange={event => setQuestion(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              const { form } = event.target as HTMLTextAreaElement

              if (form) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- requestSubmit() is a standard DOM API.
                form.requestSubmit()
              }
            }
          }}
        />
        <Button type="submit">Try me!</Button>
      </Form>
      <p>
        <strong>Answer:</strong>{' '}
        {loading ? '...loading...' : error?.toString() || data}
      </p>
    </Main>
  )
}

export default DocsGptRescript
