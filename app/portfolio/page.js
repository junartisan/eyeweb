import React from 'react'; // Fixed typo: Reac -> React
import ProjectGallery from './components/ProjectGallery';
import Footer from '../components/Footer';


export const metadata = {
    title: 'Eyewebmaster Portfolio Gallery',
    description: 'Expert Full Stack Outsource Programming Services in the Philippines. Inquire today for custom web and software development solutions.',
};

export default function PortfolioPage() {
    return (
        <div>
            <ProjectGallery />
            <Footer />
        </div>
    );
}