import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 213px)' }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout