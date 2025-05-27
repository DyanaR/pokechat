import React from "react";
import { List, Tab, Grid, Segment, Label } from "semantic-ui-react";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";
import { statNameMap } from "../assets/data";

// common style objects
const labelStyle = { width: "40%", textAlign: "left", color: "grey" };
const valueStyle = { width: "60%", textAlign: "left" };

// helper to render simple info rows
const InfoList = (items) =>
  items.map((item, idx) => (
    <List.Item
      key={idx}
      style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
    >
      <div style={labelStyle}>{item.label}</div>
      <div
        style={{
          ...valueStyle,
          display: item.isFlex ? "flex" : "block",
          alignItems: "center",
          gap: item.isFlex ? "8px" : "0",
        }}
      >
        {item.value}
      </div>
    </List.Item>
  ));

const Panes = (data, breedingData, moveColors) => [
  // --- BASE STATS TAB ---
  {
    menuItem: "Base Stats",
    render: () => (
      <Tab.Pane attached={false} style={{ fontSize: "10.5px" }}>
        <List relaxed>
          {data.stats.map((statObj, idx) => {
            const statName = statNameMap[statObj.stat.name] || statObj.stat.name;
            const statValue = statObj.base_stat;
            const statPercent = Math.min((statValue / 255) * 100, 100);
  
            return (
              <List.Item key={idx} style={{ paddingBottom: "5px" }}>
                <Grid>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column width={5} style={{ color: "grey" }}>
                      {statName}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="right">
                      {statValue}
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <div style={{ paddingRight: "4px" }}>
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            backgroundColor: "#eee",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${statPercent}%`,
                              height: "100%",
                              backgroundColor: "#49D0B0",
                            }}
                          ></div>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </List.Item>
            );
          })}
  
          {/* Total */}
          <List.Item style={{ marginTop: "5px" }}>
            <Grid>
              <Grid.Row verticalAlign="middle" style={{ fontWeight: "bold" }}>
                <Grid.Column width={5} >
                  Total
                </Grid.Column>
                <Grid.Column width={2} textAlign="right">
                  {data.stats.reduce((sum, statObj) => sum + statObj.base_stat, 0)}
                </Grid.Column>
                <Grid.Column width={9} />
              </Grid.Row>
            </Grid>
          </List.Item>
        </List>
      </Tab.Pane>
    ),
  },
  // --- MOVES TAB ---
  {
    menuItem: "Moves",
    render: () => (
      <Tab.Pane attached={false} style={{ fontSize: "10.5px" }}>
        <Segment
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            border: "none",
            boxShadow: "none",
          }}
        >
          {data.moves.map((moveObj, idx) => (
            <Label
              key={idx}
              style={{
                backgroundColor: moveColors[idx] || "#ccc",
                borderRadius: "9999px",
                fontSize: "10.5px",
                fontWeight: "bold",
                textTransform: "capitalize",
                marginBottom: "6px",
                padding: "6px 12px",
              }}
            >
              {moveObj.move.name.replace("-", " ")}
            </Label>
          ))}
        </Segment>
  
        <div
          style={{
            marginTop: "10px",
            fontSize: "10.5px",
            textAlign: "right",
            color: "grey",
          }}
        >
          Total Moves: {data.moves.length}
        </div>
      </Tab.Pane>
    ),
  },
  // --- LOADOUT TAB ---
    {
      menuItem: "Loadout",
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: "10.5px", padding: 0 }}>
          {/* Scrollable content area */}
          <div
            style={{
              maxHeight: "150px",
              overflowY: "auto",
              padding: "0 16px 10px 16px"
            }}
          >
            {/* Abilities Section */}
            <div style={{ marginBottom: "6px", fontWeight: "bold" }}>Abilities</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
              {data.abilities
                .filter((a) => !a.is_hidden)
                .map((a, idx) => (
                  <div
                    key={`ability-${idx}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#d0f0c0", // soft green
                      borderRadius: "9999px",
                      fontSize: "10.5px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {a.ability.name.replace("-", " ")}
                  </div>
                ))}
            </div>
    
            {/* Past Abilities Section */}
            <div style={{ marginBottom: "6px", fontWeight: "bold" }}>Past Abilities</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
              {data.abilities
                .filter((a) => a.is_hidden)
                .map((a, idx) => (
                  <div
                    key={`hidden-${idx}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f3d1f4", // soft purple
                      borderRadius: "9999px",
                      fontSize: "10.5px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {a.ability.name.replace("-", " ")}
                  </div>
                ))}
            </div>
    
            {/* Held Items Section */}
            <div style={{ marginBottom: "6px", fontWeight: "bold" }}>Held Items</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.held_items.length > 0 ? (
                data.held_items.map((itemObj, idx) => (
                  <div
                    key={`item-${idx}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#cceeff", // soft blue
                      borderRadius: "9999px",
                      fontSize: "10.5px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {itemObj.item.name.replace("-", " ")}
                  </div>
                ))
              ) : (
                <div style={{ color: "grey", fontSize: "10.5px" }}>None</div>
              )}
            </div>
          </div>
    
          {/* Summary outside scroll */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
              fontSize: "10.5px",
              padding: "0 16px 10px",
              color: "grey"
            }}
          >
            <span>Abilities: {data.abilities.length - (data.past_abilities?.length || 0)}</span>
            <span>Past Abilities: {data.past_abilities?.length || 0}</span>
            <span>Held Items: {data.held_items?.length || 0}</span>
          </div>
        </Tab.Pane>
      )
    },
  // --- INFO TAB ---
  {
    menuItem: "Info",
    render: () => (
      <Tab.Pane attached={false} style={{ fontSize: "10.5px" }}>
        <List divided={false} >
          {/* basic info */}
          {InfoList([
            { label: "Species", value: data.species.name },
            { label: "Height", value: `${data.height / 10} m` },
            { label: "Weight", value: `${data.weight / 10} kg` },
            {
              label: "Abilities",
              value: data.abilities.map((a) => a.ability.name).join(", "),
            },
          ])}
  
          {/* breeding header */}
          <div style={{ marginBottom: "2px", marginTop: "5px", fontWeight: "bold" }}>
            Breeding
          </div>
  
          {/* breeding info */}
          {InfoList([
            {
              label: "Gender",
              value: breedingData
                ? breedingData.gender_rate === -1
                  ? "Genderless"
                  : [
                      <LiaFemaleSolid key="female" style={{ color: "pink" }} />,
                      `${(breedingData.gender_rate / 8) * 100}%`,
                      <LiaMaleSolid
                        key="male"
                        style={{ color: "blue", marginLeft: "8px" }}
                      />,
                      `${100 - (breedingData.gender_rate / 8) * 100}%`,
                    ]
                : "Loading...",
              isFlex: true,
            },
            {
              label: "Egg Groups",
              value: breedingData
                ? breedingData.egg_groups.map((g) => g.name).join(", ")
                : "Loading...",
            },
            {
              label: "Hatch Time",
              value: breedingData
                ? `${breedingData.hatch_counter} cycles`
                : "Loading...",
            },
          ])}
        </List>
      </Tab.Pane>
    ),
  }
  
];

export default Panes;
