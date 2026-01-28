'use client'

import Image from 'next/image'
import React from 'react'
import { Box, Typography, Link as MuiLink } from '@mui/material'

// Payload Lexical RichText renderer
interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  listType?: string
  url?: string
  newTab?: boolean
  value?: {
    url?: string
    alt?: string
  }
  [key: string]: any
}

interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

// Format flags for text formatting
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

function renderTextWithFormat(text: string, format: number = 0): React.ReactNode {
  let result: React.ReactNode = text

  if (format & IS_BOLD) {
    result = <strong key="bold">{result}</strong>
  }
  if (format & IS_ITALIC) {
    result = <em key="italic">{result}</em>
  }
  if (format & IS_UNDERLINE) {
    result = <u key="underline">{result}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    result = <s key="strike">{result}</s>
  }
  if (format & IS_CODE) {
    result = (
      <Box
        component="code"
        key="code"
        sx={{
          backgroundColor: 'grey.100',
          px: 0.5,
          borderRadius: 0.5,
        }}
      >
        {result}
      </Box>
    )
  }

  return result
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (!node) return null

  // Text node
  if (node.type === 'text') {
    return <React.Fragment key={index}>{renderTextWithFormat(node.text || '', node.format)}</React.Fragment>
  }

  // Link node
  if (node.type === 'link' || node.type === 'autolink') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    return (
      <MuiLink
        key={index}
        href={node.url || '#'}
        target={node.newTab ? '_blank' : undefined}
        rel={node.newTab ? 'noopener noreferrer' : undefined}
        sx={{
          color: 'primary.main',
          '&:hover': { color: 'primary.dark' },
          textDecoration: 'underline',
        }}
      >
        {children}
      </MuiLink>
    )
  }

  // Linebreak
  if (node.type === 'linebreak') {
    return <br key={index} />
  }

  // Paragraph
  if (node.type === 'paragraph') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    // Check if paragraph is empty
    if (!children || children.length === 0 || (children.length === 1 && !children[0])) {
      return <Typography key={index} paragraph>&nbsp;</Typography>
    }
    return <Typography key={index} paragraph>{children}</Typography>
  }

  // Headings
  if (node.type === 'heading') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    const headingVariants: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
    }
    const variant = headingVariants[node.tag || 'h2'] || 'h2'
    return (
      <Typography key={index} variant={variant} gutterBottom sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    )
  }

  // Lists
  if (node.type === 'list') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    const ListTag = node.listType === 'number' ? 'ol' : 'ul'
    return (
      <Box
        component={ListTag}
        key={index}
        sx={{
          listStyleType: node.listType === 'number' ? 'decimal' : 'disc',
          listStylePosition: 'inside',
          mb: 2,
          '& li': { mb: 0.5 },
        }}
      >
        {children}
      </Box>
    )
  }

  // List item
  if (node.type === 'listitem') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    return <li key={index}>{children}</li>
  }

  // Quote
  if (node.type === 'quote') {
    const children = node.children?.map((child, i) => renderNode(child, i))
    return (
      <Box
        component="blockquote"
        key={index}
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 2,
          fontStyle: 'italic',
          my: 2,
        }}
      >
        {children}
      </Box>
    )
  }

  // Upload/Image
  if (node.type === 'upload') {
    const imageUrl = node.value?.url
    if (!imageUrl) return null
    return (
      <Box key={index} sx={{ my: 3 }}>
        <Image
          src={imageUrl}
          alt={node.value?.alt || 'Image'}
          width={800}
          height={600}
          style={{ borderRadius: '8px' }}
        />
      </Box>
    )
  }

  // Fallback: try to render children if they exist
  if (node.children && node.children.length > 0) {
    return <React.Fragment key={index}>{node.children.map((child, i) => renderNode(child, i))}</React.Fragment>
  }

  return null
}

interface RichTextProps {
  content: LexicalContent | any[] | null | undefined
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  // Handle null, undefined, or empty content
  if (!content) {
    return null
  }

  // Check if it's Lexical format (has root.children)
  if (content && typeof content === 'object' && 'root' in content && content.root?.children) {
    const nodes = content.root.children
    if (!nodes || nodes.length === 0) return null
    
    return (
      <Box sx={{ maxWidth: 'none' }}>
        {nodes.map((node: LexicalNode, index: number) => renderNode(node, index))}
      </Box>
    )
  }

  // Legacy: If it's an array (old PortableText format), try to render basic text
  if (Array.isArray(content)) {
    // Filter out invalid blocks
    const validContent = content.filter(block => block && (block._type || block.type))
    if (validContent.length === 0) return null

    return (
      <Box sx={{ maxWidth: 'none' }}>
        {validContent.map((block: any, index: number) => {
          if (block.children) {
            return <Typography key={index} paragraph>{block.children.map((child: any) => child.text).join('')}</Typography>
          }
          return null
        })}
      </Box>
    )
  }

  return null
}
