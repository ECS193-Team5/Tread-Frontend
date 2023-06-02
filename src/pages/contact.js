import "../css/Contact/contact.css";
const Contact = () => {
    return (
        <div data-testid="ContactPage" id = "ContactPage">

            <h1>Contact Information</h1>
            <p>You may email the Tread Development email at ecs193team5@gmail.com.</p>
            <br></br>
            <p>Alternatively, you can email the developers at:</p>
            <p>Rebekah Grace, rmgrace@ucdavis.edu</p>
            <p>Howard Wang, sirwang@ucdavis.edu</p>
            <p>Prabhdeep Kainth, pskainth@ucdavis.edu</p>
            <p>Kaushik Vivekanandan, kvivekanandan@ucdavis.edu</p>
            <br></br>
            <p>Expect a reply with 2-5 business days.</p>
            <br></br>
            <br></br>
            <h1>Frequently Asked Questions</h1>
            <h2>How do I delete my account?</h2>
            <p>On the website, to delete your account you must first log in. From any page, go to the left hand side bar and click on “Profile Settings”. Scroll down to find the button that allows your to delete your account.</p>

            <p>On mobile, first log in. Then, go to the Profile Button on the Navigation Bar. Next, hit the gear in the top right corner, and then hit “edit profile”. From there, you will see a button to delete your account.</p>

            <h2>How do you use my health information?</h2>
            <p>The only health information that Tread pulls is Workout information. This logs when you did an exercise, for how long, and for what distance, if applicable. Tread will store this information on its own database. To remove this information, you would have to delete your account. Tread does not pull any other information. You can always change what Tread is allowed to pull from the settings on your phone. You may still use the base features of Tread without integrating to your Health App if you wish.</p>


            <h2>How do I make friends on Tread?</h2>
            <p>There are several ways to make friends on Tread. If you have no friends and no leagues, you can start by logging exercises. This way, you will get recommended leagues. When you are in a league, you can send friend requests to the other users in that league. Additionally, once you have friends, you will begin to receive suggested friends. You can send them friend requests from the “Add Friend” Page in Mobile or the “Friend Page” on the web. Last, you can make friends with people you know in real life, either by entering their usernames in the “Add Friend” boxes or by scanning their profile QR codes.</p>
            <h2>Does Tread have any hidden fees?</h2>
            <p>No. Tread is 100% free.</p>
            <h2>Can I use Tread to track exercises other than the ones in the preset list?</h2>
            <p>Yes. On the web or on the mobile, you can hit “Enter your own” on the drop down. This will allow you to enter your own exercises names.</p>
            <br></br>
            </div>
    );
}

export default Contact;