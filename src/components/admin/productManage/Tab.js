import { useState } from 'react'
import { ADMIN_COLOR, COLOR } from '../../../constants/style'
import styled from 'styled-components'

const TabWrapper = styled.div`
  display: flex;
`
const Tab = styled.div`
  transition: 0.2s ease-out;
  width: 100%;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  background: ${ADMIN_COLOR.light_grey};
  box-shadow: inset 0px -0.5px 0.2px ${COLOR.grey};
  text-align: center;
  ${(props) =>
    props.$active &&
    `
    color: ${COLOR.text_dark};
    background: none;
    box-shadow: none;
  `};
`
// preset 預設顯示 tab
export const Tabs = ({ tabs, tabsPanel, presetTab }) => {
  const [activeTab, setActiveTab] = useState(presetTab)
  return (
    <>
      <TabWrapper>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
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
