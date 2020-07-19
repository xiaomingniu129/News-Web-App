import React from "react";
import "antd/dist/antd.css";
import { Tag } from "antd";

export default function SectionTag(props) {
  switch (props.sectionName) {
    case "world":
      return (
        <Tag color="#7c3cfc" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "World news":
      return (
        <Tag color="#7c3cfc" className="text-uppercase font-weight-bold">
          WORLD
        </Tag>
      );
      break;
    case "politics":
      return (
        <Tag color="#228B22" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "Politics":
      return (
        <Tag color="#228B22" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "us":
      return (
        <Tag color="#228B22" className="text-uppercase font-weight-bold">
          Politics
        </Tag>
      );
      break;
    case "business":
      return (
        <Tag color="#1E90FF" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "Business":
      return (
        <Tag color="#1E90FF" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "technology":
      return (
        <Tag color="#c3d900" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "Technology":
      return (
        <Tag color="#c3d900" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "sport":
      return (
        <Tag color="#FFD700" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "sports":
      return (
        <Tag color="#FFD700" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "Sport":
      return (
        <Tag color="#FFD700" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;
    case "GUARDIAN":
      return (
        <Tag color="#000080" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;

    case "NYTIMES":
      return (
        <Tag color="#A9A9A9" className="text-uppercase font-weight-bold">
          {props.sectionName}
        </Tag>
      );
      break;

    default:
      return (
        <Tag color="#696969" className="align-self-center font-weight-bold">
          HEALTH
        </Tag>
      );
      break;
  }
}
