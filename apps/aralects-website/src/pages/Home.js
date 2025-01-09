import React from 'react';
import SocialSidebar from '../components/sections/SocialSidebar/SocialSidebar';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import TextSection from '../components/sections/textSection/TextSection';
import WhyAralects from '../components/sections/WhyAralects/WhyAralects';
import ArabicAsComunity from '../components/sections/ArabicAsComunity/ArabicAsComunity';
import OurTeam from '../components/sections/ourTeam/OurTeam';
import FAQs from '../components/sections/Faqs/Faqs';
import ExperienceAralects from '../components/sections/ExperienceAralects/ExperienceAralects';



export default function Home() {
    return (
        <div>
                <div className="relative max-w-[1500px] scroll-smooth mx-auto">
                    <SocialSidebar />
                    <HeroSection />
                    <TextSection />
                    <div className='bg-[#8262b0] bg-opacity-90 rounded-t-[2rem]'>
                        <WhyAralects />
                        <ArabicAsComunity />
                        <OurTeam />
                       
            
                    </div>
                    <FAQs />
                    <ExperienceAralects />
                </div>
        </div>
    );
}
