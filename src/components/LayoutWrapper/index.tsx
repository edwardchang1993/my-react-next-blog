"use client";

import { useState, useEffect, Suspense } from "react";
import { styled, ThemeProvider, createGlobalStyle } from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineClose,
  MdMenu,
} from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { useWindowSize } from "@/hooks/useWindowSize";
import FullScreenLoading from "@/components/FullscreenLoading";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { THEME } from "@/constants/theme";
import { WRAPPER_BANNER_NAVIGATE_ITEM_LIST } from "@/constants/wrapper";
import type { ThemeAttributesType, ThemeNameType } from "@/types/theme";

const GlobalStyle = createGlobalStyle`
  :root {
    --purple: #6941c6;
    --active-color: #994639;
    --active-color-hover: rgba(153, 70, 57, 0.7);
  }
`;

const Wrapper = styled.div<{ $theme: ThemeAttributesType }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$theme.background};
  color: ${(props) => props.$theme.text};
  overflow: scroll;
  transition: background-color 0.3s ease, color 0.3s ease;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: inherit;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
  &::-webkit-scrollbar-corner {
    background: inherit;
  }
`;

const Header = styled.div<{ $theme: ThemeAttributesType }>`
  padding-top: 30px;
  padding-bottom: 8px;
  margin: 0 10%;
  border-bottom: 1px solid ${(props) => props.$theme.text};

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Container = styled.div`
  padding: 30px 10%;
  min-height: calc(100% - 200px - 60px);

  @media (max-width: 768px) {
    padding: 30px 5%;
  }
`;

const BannerNavigation = styled.div<{ $theme: ThemeAttributesType }>`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const BannerNavigateItem = styled.div<{ $theme: ThemeAttributesType }>`
  position: relative;
  font-size: 20px;
  line-height: 60px;
  margin: 0 16px;
  & > a {
    color: ${(props) => props.$theme.text};
    text-decoration: unset;
  }
  &.is-active {
    font-weight: bold;
    &:after {
      width: 100%;
      left: 0;
      bottom: 12px;
      content: "";
      display: block;
      height: 2px;
      position: absolute;
      background-color: ${(props) => props.$theme.revertBackground};
    }
  }
  &:not(.is-active) {
    font-weight: 400;
    &::after {
      width: 0;
      background: none repeat scroll 0 0 transparent;
      left: 50%;
      bottom: 12px;
      content: "";
      display: block;
      height: 2px;
      position: absolute;
      background-color: ${(props) => props.$theme.revertBackground};
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
    }
    &:hover {
      &::after {
        width: 100%;
        left: 0;
        bottom: 12px;
      }
    }
  }
`;

const BlogUserName = styled.span`
  font-size: 20px;
  line-height: 60px;
  font-weight: bold;
  margin-right: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ModeSwitchBlock = styled.div<{ $theme: ThemeAttributesType }>`
  background-color: ${(props) => props.$theme.revertBackground};
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  margin-left: 16px;
  cursor: pointer;
`;

const MenuScreenMask = styled.div<{ $theme: ThemeAttributesType }>`
  background-color: ${(props) => props.$theme.background};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const BlogNameInMenuMask = styled(BlogUserName)`
  margin-right: 0;
  margin-top: auto;
`;

const ModeSwitchBlockInMenuMask = styled(ModeSwitchBlock)`
  margin-left: 0;
  margin-top: 20px;
`;

const Footer = styled.div<{ $theme: ThemeAttributesType }>`
  height: 40px;
  padding: 30px 0;
  margin: 0 10%;
  border-top: 1px solid ${(props) => props.$theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0;
    padding: 30px 20px;
  }
`;

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [themeName, setThemeName] = useState<ThemeNameType>("dark");
  const [theme, setTheme] = useState<ThemeAttributesType>(THEME[themeName]);
  const [menuSreenMask, setMenuSreenMask] = useState<boolean>(false);

  const { isScriptLoaded } = useGoogleAuth();
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    const defaultMode = localStorage.getItem(
      "edward_blog_mode"
    ) as ThemeNameType;

    if (defaultMode) {
      setThemeName(defaultMode);
    }
  }, []);

  useEffect(() => {
    setTheme(THEME[themeName]);
  }, [themeName]);

  function isNavigateItemActive(itemPath: string) {
    return pathname === `/${itemPath}`;
  }

  function clickModeIcon(newThemeName: ThemeNameType) {
    if (themeName === newThemeName) {
      return;
    }

    setThemeName(newThemeName);

    localStorage.setItem("edward_blog_mode", newThemeName);
  }

  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Suspense fallback={<p>Loading</p>}>
          <GlobalStyle />
          <Wrapper $theme={theme}>
            <Header $theme={theme}>
              <BannerNavigation $theme={theme}>
                <BlogUserName>Edward&apos;s blog</BlogUserName>
                {windowWidth && windowWidth > 576 ? (
                  <>
                    {WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map((item) => (
                      <BannerNavigateItem
                        key={item.path}
                        $theme={theme}
                        className={
                          isNavigateItemActive(item.path) ? "is-active" : ""
                        }
                      >
                        <Link href={{ pathname: item.path }}>{item.label}</Link>
                      </BannerNavigateItem>
                    ))}
                    <ModeSwitchBlock $theme={theme}>
                      <MdOutlineLightMode
                        color={THEME.light.revertBackground}
                        size={24}
                        onClick={() => clickModeIcon("light")}
                        style={
                          themeName === "light"
                            ? {
                                color: theme.background,
                                backgroundColor: theme.background,
                                borderRadius: "50rem",
                                marginRight: "10px",
                              }
                            : { marginRight: "10px" }
                        }
                      />
                      <MdOutlineDarkMode
                        color={THEME.dark.revertBackground}
                        size={24}
                        onClick={() => clickModeIcon("dark")}
                        style={
                          themeName === "dark"
                            ? {
                                color: theme.background,
                                backgroundColor: theme.background,
                                borderRadius: "50rem",
                              }
                            : {}
                        }
                      />
                    </ModeSwitchBlock>
                  </>
                ) : (
                  <MdMenu
                    color={theme.text}
                    size={32}
                    onClick={() => setMenuSreenMask(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </BannerNavigation>
            </Header>
            <Container>{children}</Container>
            <MenuScreenMask
              $theme={theme}
              className={menuSreenMask ? "show" : "hide"}
            >
              <BlogNameInMenuMask>Edward&apos;s blog</BlogNameInMenuMask>
              {WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map((item) => (
                <BannerNavigateItem
                  key={item.path}
                  $theme={theme}
                  className={isNavigateItemActive(item.path) ? "is-active" : ""}
                >
                  <Link
                    href={{ pathname: item.path }}
                    onClick={() => setMenuSreenMask(false)}
                  >
                    {item.label}
                  </Link>
                </BannerNavigateItem>
              ))}
              <ModeSwitchBlockInMenuMask $theme={theme}>
                <MdOutlineLightMode
                  color={THEME.light.revertBackground}
                  size={24}
                  onClick={() => clickModeIcon("light")}
                  style={
                    themeName === "light"
                      ? {
                          color: theme.background,
                          backgroundColor: theme.background,
                          borderRadius: "50rem",
                          marginRight: "12px",
                        }
                      : { marginRight: "10px" }
                  }
                />
                <MdOutlineDarkMode
                  color={THEME.dark.revertBackground}
                  size={24}
                  onClick={() => clickModeIcon("dark")}
                  style={
                    themeName === "dark"
                      ? {
                          color: theme.background,
                          backgroundColor: theme.background,
                          borderRadius: "50rem",
                        }
                      : {}
                  }
                />
              </ModeSwitchBlockInMenuMask>
              {isScriptLoaded ? (
                <GoogleLoginButton
                  id="mask-google-signin-button"
                  customStyle={{ marginTop: "20px" }}
                />
              ) : (
                <div
                  style={{ width: "40px", height: "40px", marginTop: "20px" }}
                />
              )}
              <MdOutlineClose
                color={theme.text}
                size={24}
                onClick={() => setMenuSreenMask(false)}
                style={{
                  cursor: "pointer",
                  marginTop: "auto",
                  marginBottom: "36px",
                }}
              />
            </MenuScreenMask>
            <Footer $theme={theme}>
              <span>© 2025 Edward Powered by Vercel</span>
              {isScriptLoaded ? (
                <GoogleLoginButton
                  id="google-signin-button"
                  customStyle={{ marginLeft: "8px" }}
                />
              ) : (
                <div style={{ width: "40px", height: "40px" }} />
              )}
            </Footer>
          </Wrapper>
          <Toaster />
          <FullScreenLoading />
        </Suspense>
      </LoadingProvider>
    </ThemeProvider>
  );
}
