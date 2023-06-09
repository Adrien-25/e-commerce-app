import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />

            <main className='dp-flex flex-direction-column' style={{ minHeight: 'calc(100vh - 191px)' }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Adrien SCHMIDT",
};

export default Layout