import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRenderInterface {
  content: string;
}

const MarkdownRender = (props: MarkdownRenderInterface) => {
  const { content } = props;

  return (
    <div className="max-w-none prose dark:prose-invert prose-h1:text-2xl prose-h1:my-4 prose-h2:text-xl prose-h2:my-3 prose-h3:text-lg prose-h3:my-3.5 prose-h4:text-md prose-h4:my-3.5 prose-a:text-primary prose-a:no-underline prose-blockquote:my-3 prose-li:my-2 prose-img:my-4 prose-p:my-3.5 prose-pre:my-4 prose-hr:my-5 prose-pre:bg-dark-3 prose-pre:text-white prose-p:whitespace-pre-wrap">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
