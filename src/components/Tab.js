import { useState, useEffect } from 'react'
import { COLOR } from '../constants/style'
import styled from 'styled-components'
const TabWrapper = styled.div`
  display: flex;
  height: 100%;
`
const Tab = styled.div`
  transition: 0.2s ease-out;
  height: 100%;
  width: 100%;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  background: ${COLOR.primary_light_tab}66;
  box-shadow: inset 0px -0.5px 0.2px ${COLOR.border_primary_dark}66;
  ${(props) =>
    props.$active &&
    `
    color: ${COLOR.text_dark};
    background: none;
    box-shadow: none;
  `};
`
// preset 預設顯示 tab
export const Tabs = ({ tabs, tabsPanel, presetTab, changeTab }) => {
  const [activeTab, setActiveTab] = useState(presetTab)
  useEffect(() => changeTab && setActiveTab(() => changeTab), [changeTab])

  return (
    <>
      <TabWrapper>
        {tabs.map((tab, index) => (
          <Tab
            key={`tab${index}`}
            $active={activeTab === index}
            onClick={() => {
              setActiveTab(index)
            }}
            children={tab}
          />
        ))}
      </TabWrapper>
      {tabsPanel[activeTab]}
    </>
  )
}
