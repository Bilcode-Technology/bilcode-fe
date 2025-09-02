import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.js';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

const SocialShare = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-6 w-6" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-6 w-6" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-6 w-6" />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
    }
  ];

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="text-slate-600 font-semibold">Share this post:</p>
      {socialLinks.map(link => (
        <a 
          key={link.name} 
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-blue-600 transition-colors duration-200"
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-slate-800">404 - Post Not Found</h1>
        <p className="text-lg text-slate-600 mt-4">The blog post you are looking for does not exist.</p>
        <Link to="/academy/blog" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">{post.title}</h1>
            <div className="text-slate-500 flex justify-center items-center gap-2">
              <span>By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-slate-300">|</span>
              <div className="flex gap-1">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </header>

          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12"
          />

          <div 
            className="prose prose-lg max-w-none mx-auto text-slate-800 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 border-t pt-8 space-y-8">
            <SocialShare url={window.location.href} title={post.title} />
            <div className="text-center">
              <Link to="/academy/blog" className="text-blue-600 hover:underline font-semibold">
                &larr; Back to All Posts
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;