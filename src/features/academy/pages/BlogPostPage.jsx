
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug } from '../api';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

const SocialShare = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'Facebook', icon: <Facebook className="h-6 w-6" />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` }
  ];

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="text-slate-600 font-semibold">Bagikan:</p>
      {socialLinks.map(link => (
        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors"><span className="sr-only">{link.name}</span>{link.icon}</a>
      ))}
    </div>
  )
}

const BlogPostPage = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getBlogPostBySlug(postSlug).then(setPost);
  }, [postSlug]);

  if (!post) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-slate-800">404 - Postingan Tidak Ditemukan</h1>
        <Link to="/academy/blog" className="mt-8 inline-block text-blue-600 hover:underline">&larr; Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">{post.title}</h1>
            <div className="text-slate-500">
              By <Link to={`/academy/instructors/${post.authorId}`} className="font-semibold text-blue-600 hover:underline">{post.author}</Link> on {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </header>
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12" />
          <div className="prose prose-lg max-w-none mx-auto text-slate-800 prose-a:text-blue-600" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <span className="font-semibold text-slate-700">Tags:</span>
            {post.tags.map(tag => (
              <Link key={tag} to={`/academy/blog?tag=${tag}`} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors">
                {tag}
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t pt-8 space-y-8">
            <SocialShare url={window.location.href} title={post.title} />
            <div className="text-center">
              <Link to="/academy/blog" className="text-blue-600 hover:underline font-semibold">&larr; Kembali ke Blog</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
