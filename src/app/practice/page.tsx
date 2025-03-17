"use client";

import { styled, useTheme } from "styled-components";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme as compactTableUseTheme } from "@table-library/react-table-library/theme";
import { useSpaceX } from "@/hooks/useSpaceX";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import BlogName from "./components/BlogName";
import BlogTechList from "./components/BlogTechList";
import type { LauncheType } from "@/hooks/useSpaceX/types";

const ItemContainer = styled.div`
  height: 300px;
  padding: 12px;
`;

export default function PracticePage() {
  const theme = useTheme();
  const { loading, error, launches } = useSpaceX();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const tableData = {
    nodes: launches,
  };

  const columns = [
    {
      label: "任務名稱",
      renderCell: (item: LauncheType) => item.mission_name,
    },
    {
      label: "火箭名稱",
      renderCell: (item: LauncheType) => item.rocket.rocket_name,
    },
    {
      label: "火箭型態",
      renderCell: (item: LauncheType) => item.rocket.rocket_type,
    },
    {
      label: "當地發佈時間",
      renderCell: (item: LauncheType) => item.launch_date_local,
    },
  ];

  const compactTableTheme = compactTableUseTheme({
    HeaderRow: `
        color:  ${theme.text};
        background-color: ${theme.background};
        `,
    HeaderCell: `
        padding: 12px 0;
        border-bottom: 1px solid ${theme.text}; 
    `,
    Row: `
        color:  ${theme.text};
        &:nth-of-type(odd) {
          background-color:  ${theme.background};
        }

        &:nth-of-type(even) {
          background-color:  ${theme.background};
        }
      `,
    Cell: `
      padding: 12px 0;
    `,
  });

  return (
    <>
      <Title>1. SVG animation</Title>
      <ItemContainer>
        <BlogName />
        <BlogTechList />
      </ItemContainer>
      <Title>2. GraphQL</Title>
      <SubTitle>SpaceX 最新發射任務</SubTitle>
      <ItemContainer>
        <CompactTable
          data={tableData}
          columns={columns}
          theme={compactTableTheme}
          layout={{ isDiv: true, fixedHeader: true }}
        />
      </ItemContainer>
    </>
  );
}
