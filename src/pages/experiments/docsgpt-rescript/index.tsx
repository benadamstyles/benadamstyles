import * as React from 'react'
import styled from '@emotion/styled'
import { Global, keyframes } from '@emotion/react'
import { flushSync } from 'react-dom'
import { micromark } from 'micromark'
import { Main } from '../../../components/layout/main'
import transition from '../../../util/view-transitions'
import { highlightColorAlpha20 } from '../../../css/Colors.gen'
import Meta from '../../../components/Meta.gen'

const transitionNames = {
  QUESTION: 'question',
}

const globalStyles = {
  [`html::view-transition-old(${transitionNames.QUESTION}), html::view-transition-new(${transitionNames.QUESTION})`]: {
    animationDuration: '0s',
  },
}

const Button = styled.button({
  border: 'none',
  background: 'transparent',
  fontSize: '1.8em',

  ':hover:not(:disabled)': {
    opacity: 0.3,
  },
})

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

const Form = styled.form({
  display: 'flex',
  gap: '1rem',
  margin: 0,
  padding: 0,
  border: 'none',
})

const fadeInOut = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`

const Loading = styled.p({
  textAlign: 'center',
  animation: `${fadeInOut} 1s ease-in-out infinite`,
})

const inputCss = {
  width: '100%',
  backgroundColor: 'transparent',
  border: '2px solid rgba(0, 0, 0, 0.1)',
  padding: '0.5rem',
  borderRadius: '3px',
}

const Input = styled.input(inputCss)
const TextArea = styled.textarea({
  ...inputCss,
  viewTransitionName: transitionNames.QUESTION,
})

const messageCss = {
  padding: '0.5rem 1rem',
  borderRadius: '1rem',
}

const Question = styled.div({
  ...messageCss,
  margin: '0 0 0 3rem',
  borderBottomRightRadius: 0,
  backgroundColor: highlightColorAlpha20,
})

const Answer = styled.div({
  ...messageCss,
  margin: '0 3rem 0 0',
  borderBottomLeftRadius: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  '& > *:first-child': {
    marginTop: 0,
  },
})

interface Question {
  question: string
  history: string[]
  apiKey: string
}

interface Answer {
  answer: string
  query: string
}

const API_HOST = 'https://docsgpt-rescript-production.up.railway.app'
const DEBUG = false

async function submitQuestion({
  question,
  apiKey,
  history,
}: Question): Promise<Answer> {
  if (DEBUG) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    return {
      answer: `## Grocery List

Here's what I need to buy at the store:

\`\`\`rescript
-  Milk
-  Eggs
-  Bread
\`\`\`

or this:
\`\`\`
-  Milk
-  Eggs
-  Bread
\`\`\`
**Don't forget to pick up some fresh fruit!**

And while you're at it, check out this [recipe for banana bread](https://www.example.com/banana-bread-recipe). It's delicious!`,
      query: question,
    }
  }

  const response = await fetch(`${API_HOST}/api/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      api_key: apiKey,
      embeddings_key: apiKey,
      history:
        history.length > 0
          ? JSON.stringify(
              // Currently, I think the python app only reads elements 0 and 1.
              history.slice(-2)
            )
          : null,
      active_docs: 'default',
    }),
  })

  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`)
  }

  const json: unknown = await response.json()

  if (json && typeof json === 'object' && 'answer' in json && 'query' in json) {
    const { answer, query } = json
    if (typeof answer === 'string' && typeof query === 'string') {
      return { answer, query }
    }
  }

  throw Error(`Invalid response: ${JSON.stringify(json)}`)
}

interface Query<Data> {
  data: Data
  loading: boolean
  error: Error | undefined
}

interface Mutation<Data> {
  initialData: Data
  onSuccess?: (data: Data) => void
  onError?: (error: Error) => void
}

function useMutation<Data>(
  { initialData, onSuccess, onError }: Mutation<Data>,
  mutation: () => Promise<Data>
) {
  const [state, setState] = React.useState<Query<Data>>({
    data: initialData,
    loading: false,
    error: undefined,
  })

  const mutate = React.useCallback(() => {
    setState(prev => ({ ...prev, loading: true }))
    mutation()
      .then(data => {
        setState(prev => ({ ...prev, data, error: undefined }))
        onSuccess?.(data)
      })
      .catch((error: Error) => {
        setState(prev => ({ ...prev, error }))
        onError?.(error)
      })
      .finally(() => setState(prev => ({ ...prev, loading: false })))
  }, [mutation, onError, onSuccess])

  return [state, mutate] as const
}

type CompilationResult =
  | {
      type: 'success'
      ['js_code']: string
      warnings: unknown[]
      ['type_hints']?: unknown[]
    }
  | {
      type: 'unexpected_error'
      msg: string
    }
  | {
      type: 'syntax_error' | 'type_error' | 'warning_error' | 'other_error'
      errors: unknown[]
    }

interface Compiler {
  rescript: {
    compile: (code: string) => CompilationResult
  }
}

function useCompiler() {
  const [compiler, setCompiler] = React.useState<Compiler | undefined>(
    undefined
  )

  React.useEffect(() => {
    /* eslint-disable fp/no-mutation -- how else? */
    const scriptElementCompiler = document.createElement('script')
    scriptElementCompiler.type = 'text/javascript'
    scriptElementCompiler.src =
      'https://cdn.rescript-lang.org/v10.1.2/compiler.js'

    const scriptElementReact = document.createElement('script')
    scriptElementReact.type = 'text/javascript'
    scriptElementReact.src =
      'https://cdn.rescript-lang.org/v10.1.2/@rescript/react/cmij.js'
    /* eslint-enable fp/no-mutation */

    const unsafeWindow = (window as unknown) as {
      ['rescript_compiler']: { make: () => Compiler }
    }

    const onLoad = () => setCompiler(unsafeWindow.rescript_compiler.make())

    scriptElementCompiler.addEventListener('load', onLoad)

    document.head.appendChild(scriptElementCompiler)
    document.head.appendChild(scriptElementReact)

    return () => {
      scriptElementCompiler.removeEventListener('load', onLoad)
      document.head.removeChild(scriptElementCompiler)
      document.head.removeChild(scriptElementReact)
    }
  }, [])

  return compiler
}

function useCompilation(history: string[]) {
  const [results, setResults] = React.useState<
    (CompilationResult[] | undefined)[]
  >([])

  const compiler = useCompiler()

  const codeblocksByMessage = React.useMemo(
    () =>
      history.map((message, index) => {
        if (index % 2 === 0) {
          return undefined
        }

        return Array.from(message.matchAll(/```([\S]*)\n(.*?)```/gsu))
          .map(([, language, code]) => ({ language, code }))
          .flatMap(({ language, code }) =>
            language === 'rescript' || language === 'res' || language === ''
              ? code
              : []
          )
      }),
    [history]
  )

  // Compile any new codeblocks.
  React.useEffect(() => {
    if (compiler && results.length !== codeblocksByMessage.length) {
      const newCodeblocksByMessage = codeblocksByMessage.slice(results.length)

      setResults(prev => [
        ...prev,
        ...newCodeblocksByMessage.map((codeblocks):
          | CompilationResult[]
          | undefined =>
          codeblocks?.map(code => compiler.rescript.compile(code))
        ),
      ])
    }
  }, [codeblocksByMessage, compiler, results])

  return results
}

const title = 'DocsGPT for ReScript'

const DocsGptRescript = () => {
  const [apiKey, setApiKey] = React.useState('')
  const [question, setQuestion] = React.useState('')

  const [textAreaRows, setTextAreaRows] = React.useState(1)

  const [history, setHistory] = React.useState<string[]>([])

  const compilationResults = useCompilation(history)

  const mutation = React.useCallback(
    () => submitQuestion({ question, apiKey, history }),
    [question, apiKey, history]
  )

  const onSuccess = React.useCallback(({ answer, query }: Answer) => {
    transition({
      updateDOM() {
        flushSync(() => {
          setQuestion('')
          setHistory(prev => [...prev, query, answer])
        })
      },
    })
  }, [])

  React.useEffect(() => {
    window.scroll({
      behavior: 'smooth',
      top: document.body.scrollHeight,
    })
  }, [history])

  const [{ loading, error }, submit] = useMutation(
    {
      initialData: { query: '', answer: '' },
      onSuccess,
    },
    mutation
  )

  const disabled = loading

  return (
    <Main>
      <Meta title={title} />
      <Global styles={globalStyles} />

      <h1>{title}</h1>

      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: micromark(
              'Based on [DocsGPT](https://github.com/arc53/docsgpt) by [Arc53](https://arc53.com/), this is a proof-of-concept [ChatGPT](https://openai.com/blog/chatgpt/) chatbot trained on [ReScript](https://rescript-lang.org/) documentation.\n\nYou can ask it questions about ReScript, such as:\n\n> <span style="user-select: all">**How can I choose the file suffix of my output files?**</span>\n\n> <span style="user-select: all">**How do I make a record property mutable?**</span>\n\nHead to [the OpenAI API platform](https://platform.openai.com/) to get an API key.',
              { allowDangerousHtml: true }
            ),
          }}
        />

        <Input
          placeholder="OpenAI API key"
          value={apiKey}
          type="password"
          onChange={event => setApiKey(event.target.value)}
        />

        {history.map((message, index) => {
          if (index % 2 === 0) {
            return (
              <Question
                // eslint-disable-next-line react/no-array-index-key -- we have no id.
                key={index}
                dangerouslySetInnerHTML={{ __html: micromark(message) }}
              />
            )
          }

          const results = compilationResults[index]

          return (
            <React.Fragment
              // eslint-disable-next-line react/no-array-index-key -- we have no id.
              key={index}>
              <Answer
                dangerouslySetInnerHTML={{ __html: micromark(message) }}
              />
              {results && (
                <p>
                  {results.every(res => res?.type === 'success')
                    ? '✅ All ReScript code in this reply compiles successfully.'
                    : '❌ DocsGPT replied with invalid ReScript code.'}
                </p>
              )}
            </React.Fragment>
          )
        })}

        {loading ? (
          <Loading>...loading...</Loading>
        ) : (
          error && <p>{error.message}</p>
        )}

        <Form
          onSubmit={event => {
            event.preventDefault()
            if (!disabled && question) {
              submit()
            }
          }}>
          <TextArea
            disabled={disabled}
            placeholder="Question"
            value={question}
            rows={textAreaRows}
            onChange={({ target: { value, scrollHeight, clientHeight } }) => {
              if (scrollHeight > clientHeight) {
                const heightPerLine = clientHeight / textAreaRows
                const lines = Math.ceil(scrollHeight / heightPerLine)
                setTextAreaRows(lines)
              }
              setQuestion(value)
            }}
            onKeyPress={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                if (event.target instanceof HTMLTextAreaElement) {
                  const { form } = event.target
                  if (form) {
                    form.requestSubmit()
                  }
                }
              }
            }}
          />
          <Button type="submit" disabled={disabled} title="Send">
            <span role="img" aria-label="Send">
              📮
            </span>
          </Button>
        </Form>
      </Container>
    </Main>
  )
}

export default DocsGptRescript
