import { useEffect, useState } from "react";


const Meme = () => {
    const [allMemes, setAllMemes] = useState([]);
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        img: "http://i.imgflip.com/1bij.jpg"
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes));
    }, [])
    function getMemeImage() {
        const memesArray = allMemes;
        const meme1 = memesArray[Math.floor(Math.random() * memesArray.length)].url;
        console.log(meme1);
        setMeme(prevMeme => ({
            ...prevMeme,
            img: meme1
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleChange(event) {
        const { name, value } = event.target;
        console.log(name, value);
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }
    return (
        <main>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form__input"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form__input"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <button
                    className="form__button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </form>
            <div className="meme">
                <img src={`${meme.img}`} className="meme__img" />
                <h2 className="meme__text top">{meme.topText}</h2>
                <h2 className="meme__text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
};

export default Meme;
