import { useEffect } from 'react';
import './About.css';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { SiteHeader } from '../components/SiteHeader';

export default function Auth() {
    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'About',
        });
    }, []);

    return (
        <div className="content">
            <SiteHeader />
            <div className="about-page-container">
                <div className="about-page-text-container">
                    {`"I don't really care what the tool is...it just needs to be something that is always present and as soon as you have an idea, it needs to go into one place. You don't have to think about where to record it and you don't end up with a random note on your iPhone and another one in an Evernote doc and a third thing in a Google doc and now it's hard to find again." -James Clear`}
                </div>
                <div className="about-page-text-container">
                    {`"Ideas are commodity. Execution of them is not." — Michael Dell`}
                </div>
                <div className="about-page-text-container">{`"If you have an apple and I have an apple and we exchange these apples then you and I will still each have one apple. But if you have an idea and I have an idea and we exchange these ideas, then each of us will have two ideas." - George Bernard Shaw`}</div>
            </div>
        </div>
    );
}
