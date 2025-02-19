import React, { useState } from "react";
import { Typography, Card } from "antd";
import { motion } from "framer-motion";
import logo from "../logo.svg";
const { Title, Text } = Typography;

const information = [
  {
    title: "PRODUCTIVITY",
    secondaryText: "From 100 - 150 >> 10 - 20 person-hrs per document",
    image: logo,
    color: "#1E3A8A",
  },
  {
    title: "SCALE & TURN AROUND TIME",
    secondaryText: "Handle 10X to 7X Volumes with same effort",
    image: logo,
    color: "#2563EB",
  },
  {
    title: "QUALITY & STANDARDIZATION",
    secondaryText: "Reduce Human errors, Spelling, Grammar, & inconsistencies",
    image: logo,
    color: "#3B82F6",
  },
  {
    title: "REFERENCIABILITY",
    secondaryText: "Easy Link to Original Input, for review and testing",
    image: logo,
    color: "#60A5FA",
  },
  {
    title: "ANALYTICS & INSIGHTS",
    secondaryText: "Value added Insights for simplified decision-making",
    image: logo,
    color: "#93C5FD",
  },
];

const FlippableCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        perspective: "1000px",
        height: 200,
        width: "100%",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front side */}
        <Card
          hoverable
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 8,
            borderColor: item.color,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ maxWidth: 50, marginBottom: 10 }}
          />
          <Title level={5} style={{ color: "#1E3A8A", margin: "6px 0", fontSize: 14 }}>
            {item.title}
          </Title>
        </Card>

        {/* Back side */}
        <Card
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 8,
            borderColor: item.color,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
        >
          <Title level={5} style={{ color: "#1E3A8A", margin: "6px 0", fontSize: 14 }}>
            {item.title}
          </Title>
          <Text style={{ color: "#1E3A8A", fontSize: 12 }}>{item.secondaryText}</Text>
        </Card>
      </motion.div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div style={contentStyle}>
      <Title level={2} style={{ color: "#1E3A8A", textAlign: "center", fontSize: 24, marginBottom: 24 }}>
        Our Value Proposition & Business Benefits
      </Title>
      <div style={cardsContainerStyle}>
        {information.map((val, index) => (
          <div key={index} style={cardWrapperStyle}>
            <FlippableCard item={val} />
          </div>
        ))}
      </div>
      <Title level={3} style={{ color: "#1E3A8A", textAlign: "center", marginTop: "3%", fontSize: 18 }}>
        Enabled on a pay-per-use SaaS Platform, inclusive of Customization, Infra, & Maintenance
      </Title>
    </div>
  );
};

export default Home;

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "2% 0",
  minHeight: "90vh",
  backgroundColor: "#F8FAFC",
  alignItems: "center",
};

const cardsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "nowrap",
  maxWidth: "1200px",
  width: "100%",
  overflowX: "auto",
  padding: "16px 0",
  scrollbarWidth: "thin",
  scrollbarColor: "#93C5FD #F8FAFC",
  gap: "20px",
};

const cardWrapperStyle: React.CSSProperties = {
  flex: "0 0 auto",
  width: "200px",
};