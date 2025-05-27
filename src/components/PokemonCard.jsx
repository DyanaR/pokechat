import React, { useEffect, useState } from "react";
import { Card, Tab, Grid, Header } from "semantic-ui-react";
import "../App.scss";
import { POKE_API } from "../AppConfig";
import axios from "axios";
import { typeColors, colors } from "../assets/data.js";
import Panes from "../components/Panes";
import { Types } from "../components/Types";
import { Sprite } from "../components/Sprite";


const PokemonCard = ({ pokemonID }) => {
  const [data, setData] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [breedingData, setBreedingData] = useState(null);
  const [moveColors, setMoveColors] = useState([]);

  // randomly picks a colors for moves
  const randomSoftColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonRes = await axios.get(`${POKE_API}/pokemon/${pokemonID}`);
        const speciesUrl = pokemonRes.data.species.url;
  
        const [speciesRes] = await Promise.all([
          axios.get(speciesUrl)
        ]);
  
        setData(pokemonRes.data);
        setBreedingData(speciesRes.data);
        console.log(pokemonRes.data)
        const spriteUrls = Object.values(pokemonRes.data.sprites).filter(
          (url) => typeof url === "string" && url !== null
        );
        setSprites(spriteUrls);
  
        const colors = pokemonRes.data.moves.map(() => randomSoftColor());
        setMoveColors(colors);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };
  
    fetchData();
  }, [pokemonID]);

  if (!data) {
    return <Card>Loading...</Card>;
  }

  const mainType = data.types[0]?.type.name || "normal";
  const cardColor = typeColors[mainType] || "grey";
  const panes = Panes(data, breedingData, moveColors);

  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.floor((num >> 16) + 255 * (percent / 100)));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + 255 * (percent / 100)));
    const b = Math.min(255, Math.floor((num & 0x0000ff) + 255 * (percent / 100)));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Card
      style={{borderRadius: "25px", overflow: "hidden", position: "relative"}}
    >
      <div
        style={{
          background: `linear-gradient(315deg, ${cardColor} 50%, ${lightenColor(cardColor, 30)})`,
          position: "relative",
          width: "100%",
          minHeight: "300px",
          maxHeight: "300px",
          paddingTop: "20px",
        }}
      >
        {/* Sprite Image */}
        <Sprite sprites={sprites} />

        {/* name and types */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px", // add right so content can stretch across
          zIndex: 4,
        }}>
          <Grid >
            <Grid.Row columns={2} verticalAlign="middle">
            <Grid.Column textAlign="left">
            <Header as="h2" style={{ color: "white", textTransform: "capitalize", margin: 0 }}>
              {data.name}
            </Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Header as="h5" style={{ color: "white", margin: 0 }}>
                #{String(data.id).padStart(3, "0")}
              </Header>
            </Grid.Column>
            </Grid.Row>
          </Grid>
          <div style={{ marginTop: "-10px" }}> 
            <Types types={data.types} />
          </div>
        </div>
      </div>
      
      {/* Pokemon Tab Information */}
      <div style={{ zIndex: 4 }}>
        <Card.Content
          style={{
            position: "relative",
            background: "white",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px",
            marginTop: "-20px",
            paddingTop: "25px",
            padding: "20px",
            maxHeight: "300px",
          }}
        >
          <Tab menu={{secondary: true, pointing: true, style: {
      fontSize: "11.5px",        // makes tab labels smaller
      marginBottom: "8px",     // spacing before content
    },}}
            panes={panes}
            style={{
              border: "none",
              boxShadow: "none",
            }}
          />
        </Card.Content>
      </div>
    </Card>
  );
};

export { PokemonCard };