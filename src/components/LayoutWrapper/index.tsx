"use client";

import { useState, useEffect } from "react";
import { styled, ThemeProvider } from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineClose,
  MdMenu,
} from "react-icons/md";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { THEME } from "@/constants/theme";
import { WRAPPER_BANNER_NAVIGATE_ITEM_LIST } from "@/constants/wrapper";
import type { ThemeAttributesType, ThemeNameType } from "@/types/theme";
import { useGoogleAuth } from "@/context/GoogleAuthContext";

const Wrapper = styled.div<{ $theme: ThemeAttributesType }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$theme.background};
  color: ${(props) => props.$theme.text};
  overflow: scroll;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Banner = styled.div`
  padding: 30px 10%;
  @media (max-width: 768px) {
    padding: 30px 0px;
  }
`;

const Container = styled.div`
  padding: 30px 10%;
  @media (max-width: 768px) {
    padding: 30px 5%;
  }
`;

const BannerNavigation = styled.div<{ $theme: ThemeAttributesType }>`
  position: sticky;
  left: 0;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.$theme.background};
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const BannerNavigateItem = styled.div<{ $theme: ThemeAttributesType }>`
  position: relative;
  font-size: 20px;
  line-height: 60px;
  padding: 0 16px;
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

const BlogName = styled.div`
  text-align: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  font-size: 140px;
  line-height: 160px;
  @media (max-width: 992px) {
    font-size: 120px;
    line-height: 140px;
  }
  @media (max-width: 768px) {
    font-size: 100px;
    line-height: 120px;
  }
  @media (max-width: 576px) {
    font-size: 70px;
    line-height: 90px;
  }
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

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [themeName, setThemeName] = useState<ThemeNameType>(
    localStorage.getItem("edward_blog_mode")
      ? (localStorage.getItem("edward_blog_mode") as ThemeNameType)
      : "light"
  );
  const [theme, setTheme] = useState<ThemeAttributesType>(THEME[themeName]);
  const [menuSreenMask, setMenuSreenMask] = useState<boolean>(false);

  const { isScriptLoaded } = useGoogleAuth();
  const size = useWindowSize();

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{
      width: number | undefined;
      height: number | undefined;
    }>({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  function clickModeIcon(themeName: ThemeNameType) {
    setThemeName(themeName);
    setTheme(THEME[themeName]);

    localStorage.setItem("edward_blog_mode", themeName);
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper $theme={theme}>
        <Banner>
          <BannerNavigation $theme={theme}>
            <BlogUserName>Edward's blog</BlogUserName>
            {size.width && size.width > 576 ? (
              <>
                {WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map((item) => (
                  <BannerNavigateItem
                    key={item.path}
                    $theme={theme}
                    className={
                      pathname.includes(`/${item.path}`) ? "is-active" : ""
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
                {isScriptLoaded ? (
                  <GoogleLoginButton
                    id="google-signin-button"
                    customStyle={{ marginLeft: "8px" }}
                  />
                ) : (
                  <></>
                )}
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
          <BlogName>MY BLOG</BlogName>
        </Banner>
        <Container>{children}</Container>
        <MenuScreenMask
          $theme={theme}
          className={menuSreenMask ? "show" : "hide"}
        >
          <BlogNameInMenuMask>Edward</BlogNameInMenuMask>
          {WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map((item) => (
            <BannerNavigateItem
              key={item.path}
              $theme={theme}
              className={pathname.includes(`/${item.path}`) ? "is-active" : ""}
            >
              <Link href={{ pathname: item.path }}>{item.label}</Link>
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
            <></>
          )}
          <MdOutlineClose
            color={theme.text}
            size={24}
            onClick={() => setMenuSreenMask(false)}
            style={{
              cursor: "pointer",
              marginTop: "auto",
              marginBottom: "24px",
            }}
          />
        </MenuScreenMask>
      </Wrapper>
    </ThemeProvider>
  );
}
