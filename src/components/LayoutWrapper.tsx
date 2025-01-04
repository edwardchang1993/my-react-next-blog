'use client'

import { useState, useEffect } from 'react'
import { styled, ThemeProvider } from 'styled-components'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineClose, MdMenu } from "react-icons/md";
import { THEME } from '@/constants/const/theme'
import { WRAPPER_BANNER_NAVIGATE_ITEM_LIST } from '@/constants/const/wrapper'
import type { ThemeAttributesType, ThemeNameType } from '@/constants/types/theme'

const Wrapper = styled.div<{ $theme: ThemeAttributesType }>`
    width: 100%;
    height: 100%;
    background-color: ${props => props.$theme.background};
    color: ${props => props.$theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
`

const Banner = styled.div`
  padding: 30px 10%;
  @media (max-width: 768px) {
    padding: 30px 0px;
  }
`

const Container = styled.div`
  padding: 30px 10%;
  @media (max-width: 768px) {
    padding: 30px 5%;
  }
`

const BannerNavigation = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`

const BannerNavigateItem = styled.div<{ $theme: ThemeAttributesType }>`
  position: relative;
  font-size: 20px;
  line-height: 60px;
  padding: 0 16px;
  & > a {
    color: ${props => props.$theme.text};
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
      background-color: ${props => props.$theme.revertBackground};
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
      background-color: ${props => props.$theme.revertBackground};
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
`

const BlogUserName = styled.span`
  font-size: 20px;
  line-height: 60px;
  font-weight: bold;
  margin-right: auto;
`

const ModeSwitchBlock = styled.div<{ $theme: ThemeAttributesType }>`
  background-color: ${props => props.$theme.revertBackground};
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  margin-left: 16px;
  cursor: pointer;
`

const MenuIconImage = styled.img.attrs(props => ({
  src: props.src.src
}))`
  padding: 2px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: color 0.3s ease, color 0.3s ease;
  &:first-child {
    margin-right: 8px;
  }
  `

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
`

const MenuScreenMask = styled.div<{ $theme: ThemeAttributesType }>`
  background-color: ${props => props.$theme.background};
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
`

const BlogNameInMenuMask = styled(BlogUserName)`
  margin-right: 0;
  margin-top: auto;
`

const ModeSwitchBlockInMenuMask = styled(ModeSwitchBlock)`
  margin-left: 0;
  margin-top: 20px;
`

export default function LayoutWrapper({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname = usePathname()
    const localModeName = localStorage.getItem('edward_blog_mode') as ThemeNameType || 'light'

    const [themeName, setThemeName] = useState<ThemeNameType>(localModeName)
    const [theme, setTheme] = useState<ThemeAttributesType>(THEME[themeName])
    const [menuSreenMask, setMenuSreenMask] = useState<boolean>(false)

    const size = useWindowSize()

    function useWindowSize() {
      const [windowSize, setWindowSize] = useState<{
        width: number | undefined,
        height: number | undefined
      }>({
        width: undefined,
        height: undefined,
      });
    
      useEffect(() => {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }
        
        window.addEventListener('resize', handleResize);
         
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
      }, [])
      return windowSize
    }

    function clickModeIcon(themeName: ThemeNameType) {
      setThemeName(themeName)
      setTheme(THEME[themeName])
      
      localStorage.setItem('edward_blog_mode', themeName)
    }

    return (
      <ThemeProvider theme={theme} >
        <Wrapper $theme={theme}>
            <Banner>
              <BannerNavigation>
                <BlogUserName>Edward</BlogUserName>
                {
                  size.width && size.width > 576 ?
                  <>
                    {
                      WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map(item =>
                          <BannerNavigateItem key={item.path} $theme={theme} className={ pathname.includes(`/${item.path}`) ? 'is-active' : '' }>
                            <Link href={{ pathname: item.path }}>{ item.label }</Link>
                          </BannerNavigateItem>
                      )
                    }
                    <ModeSwitchBlock $theme={theme}>
                      <MdOutlineLightMode color={THEME.light.revertBackground} size={24} onClick={() => clickModeIcon('light')} style={ themeName === 'light' ? { color: theme.background, backgroundColor: theme.background, borderRadius: '50rem', marginRight: '10px' } : { marginRight: '10px' } } />
                      <MdOutlineDarkMode color={THEME.dark.revertBackground} size={24} onClick={() => clickModeIcon('dark')} style={ themeName === 'dark' ? { color: theme.background, backgroundColor: theme.background, borderRadius: '50rem' } : {} } />
                    </ModeSwitchBlock>
                  </>
                  :
                  <MdMenu color={theme.text} size={32} onClick={() => setMenuSreenMask(true)} style={{ cursor: 'pointer' }} />
                }
              </BannerNavigation>
              <BlogName>MY BLOG</BlogName>
            </Banner>
            <Container>
              {children}
            </Container>
            <MenuScreenMask $theme={theme} className={menuSreenMask ? 'show' : 'hide'} >
              <BlogNameInMenuMask>Edward</BlogNameInMenuMask>
              {
                WRAPPER_BANNER_NAVIGATE_ITEM_LIST.map(item =>
                    <BannerNavigateItem key={item.path} $theme={theme} className={ pathname.includes(`/${item.path}`) ? 'is-active' : '' }>
                      <Link href={{ pathname: item.path }}>{ item.label }</Link>
                    </BannerNavigateItem>
                )
              }
              <ModeSwitchBlockInMenuMask $theme={theme}>
                <MdOutlineLightMode color={THEME.light.revertBackground} size={24} onClick={() => clickModeIcon('light')} style={ themeName === 'light' ? { color: theme.background, backgroundColor: theme.background, borderRadius: '50rem', marginRight: '12px' } : { marginRight: '10px' } } />
                <MdOutlineDarkMode color={THEME.dark.revertBackground} size={24} onClick={() => clickModeIcon('dark')} style={ themeName === 'dark' ? { color: theme.background, backgroundColor: theme.background, borderRadius: '50rem' } : {} } />
              </ModeSwitchBlockInMenuMask>
              <MdOutlineClose color={theme.text} size={24} onClick={() => setMenuSreenMask(false)} style={{ cursor: 'pointer', marginTop: 'auto', marginBottom: '24px' }} />
            </MenuScreenMask>
        </Wrapper>
      </ThemeProvider>
    )
}