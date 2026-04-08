import styled from "styled-components"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ToyProjectsData } from "./../datas/index"

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
`

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  font-size: 20px;
  ${({ theme }) => theme.MIXINS.fontDungGeunMo};
  color: #fff;
  li {
    width: 50%;
  }
  .img {
    height: 200px;
    margin-bottom: 16px;
  }
  .tit {
    font-size: 20px;
    color: #f1cc2f;
  }
  .desc {
    margin-top: 16px;
  }
`
function ToyProjects(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(ToyProjectsData)
  }, [])

  return (
    <Wrap>
      <List>
        {data &&
          data.map((item, i) => {
            return (
              <li key={item.id}>
                <Link href={item.url} target="_blank">
                  <img src={item.imgUrl} alt={item.title} className="img" />
                  <div className="tit">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                </Link>
              </li>
            )
          })}
      </List>
    </Wrap>
  )
}

ToyProjects.bgColor = "#111"

export default ToyProjects
