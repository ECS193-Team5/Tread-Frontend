import PhotoDisplay from "../components/Challenge/PhotoDisplay";

const TestDiv = () => {
    return(
        <div>
            <PhotoDisplay photos={["NewUser#2224"]}/>
            <PhotoDisplay photos={["NewUser#2224", "NewUser#2224"]}/>
            <PhotoDisplay photos={["NewUser#2224", "NewUser#2224","NewUser#2224"]}/>
            <PhotoDisplay photos={["NewUser#2224", "NewUser#2224","NewUser#2224", "NewUser#2224"]}/>
        </div>
    );
}
export default TestDiv;