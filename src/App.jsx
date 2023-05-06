import {useState} from "react";
let jsonData = { /* paste the JSON data here */ };
fetch('/db.json')
    .then(response => response.json())
    .then(data => jsonData = data)
    .catch(error => console.error(error));

function App() {
    const [showPictures, setShowPictures] = useState(true);
    const [filterActive, setFilterActive] = useState(false);

    const togglePictures = () => {
        setShowPictures(!showPictures);
    }

    const toggleFilter = () => {
        setFilterActive(!filterActive);
    }

    return (
        <div>
            <div>
                <button onClick={togglePictures}>{showPictures ? 'Hide Pictures' : 'Show Pictures'}</button>
                <label>
                    Filter active:
                    <input type="checkbox" checked={filterActive} onChange={toggleFilter} />
                </label>
            </div>
            {
                jsonData.plants
                .filter((plant) => !filterActive || plant.active)
                .map((plant) => {
                    if (!showPictures) {
                        return <div key={plant.id}>{plant.title}</div>;
                    }
                    return (
                        <div key={plant.id}>
                            <h2>{plant.title}</h2>
                            <img src={plant.pic} alt={plant.title} />
                        </div>
                    );
                })}
        </div>
    );
}

export default App;
