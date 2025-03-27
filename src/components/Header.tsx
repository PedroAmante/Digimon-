// src/components/Header.tsx
"use client";

import React from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 40px;
  background-color: transparent;
`;

const ThemeLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <ThemeLabel>Escolha seu tema:</ThemeLabel>
      <ThemeSwitcher />
    </HeaderContainer>
  );
};

export default Header;
