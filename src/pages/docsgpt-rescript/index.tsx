import * as React from 'react'

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

  return (
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
      <button
        type="button"
        onClick={() =>
          submitQuestion({
            question: 'In rescript, how do I make a record property mutable?',
            apiKey,
            apiHost,
          }).then(answer => console.log(answer))
        }>
        Try me!
      </button>
    </div>
  )
}

export default DocsGptRescript
