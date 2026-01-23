import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.url) {
        return null
      }
      return (
        <div className="my-6">
          <Image
            src={value.url}
            alt={value.alt || 'Article image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.alt && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

interface RichTextProps {
  content: any[]
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  )
}
