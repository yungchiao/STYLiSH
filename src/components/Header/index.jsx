import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import cartMobile from "./cart-mobile.png";
import cart from "./cart.png";
import clockMobile from "./clock-mobile.png";
import clock from "./clock.png";
import logo from "./logo.png";
import profileMobile from "./profile-mobile.png";
import profile from "./profile.png";
import search from "./search.png";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 140px;
  width: 100%;
  padding: 0 54px 0 60px;
  border-bottom: 40px solid #313538;
  z-index: 99;
  background-color: white;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    height: 52px;
    padding: 0;
    border: none;
    justify-content: center;
  }
`;

const Logo = styled(Link)`
  width: 258px;
  height: 48px;
  background-image: url(${logo});
  background-size: contain;

  @media screen and (max-width: 1279px) {
    width: 129px;
    height: 24px;
  }
`;

const CategoryLinks = styled.div`
  margin: 16px 0 0 10px;

  @media screen and (max-width: 1279px) {
    margin: 0;
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #313538;
  }
`;

const CategoryLink = styled.a`
  font-size: 20px;

  letter-spacing: 25px;
  padding-left: 39px;
  padding-right: 11px;
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.$isActive ? "#8b572a" : "#3f3a3a")};

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: normal;
    padding: 0;
    text-align: center;
    color: ${(props) => (props.$isActive ? "white" : "#828282")};
    line-height: 50px;
    flex-grow: 1;
  }

  &:hover {
    color: #8b572a;
    cursor: pointer;

    @media screen and (max-width: 1279px) {
      color: white;
    }
  }

  & + &::before {
    content: "|";
    position: absolute;
    left: 0;
    color: #3f3a3a;

    @media screen and (max-width: 1279px) {
      color: #828282;
    }
  }
`;

const SearchInput = styled.input`
  height: 40px;

  width: 214px;
  border: none;
  outline: none;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 45px 6px 20px;
  border: solid 1px #979797;
  background-image: url(${search});
  background-size: 44px;
  background-position: 160px center;
  background-repeat: no-repeat;
  font-size: 20px;
  line-height: 24px;
  color: #8b572a;

  @media screen and (max-width: 1279px) {
    width: 0;
    border: none;
    position: fixed;
    right: 16px;
    background-size: 32px;
    background-position: right center;
    flex: 1;
  }

  &:focus {
    @media screen and (max-width: 1279px) {
      width: calc(100% - 20px);
      border: solid 1px #979797;
    }
  }
`;

const PageLinks = styled.div`
  margin-left: 42px;
  display: flex;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-left: 0;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #313538;
  }
`;

const PageLink = styled(Link)`
  @media screen and (max-width: 1279px) {
    width: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & + & {
    margin-left: 42px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
    }
  }

  & + &::before {
    @media screen and (max-width: 1279px) {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 24px;
      margin: 10px 51px 10px 0;
      background-color: #828282;
    }
  }
`;

const PageLinkIcon = styled.div`
  width: 44px;
  height: 44px;
  cursor: pointer;
  background-size: contain;
  position: relative;
`;

const PageLinkCartIcon = styled(PageLinkIcon)`
  background-image: url(${cart});

  @media screen and (max-width: 1279px) {
    background-image: url(${cartMobile});
  }
`;

const PageLinkHistoryIcon = styled(PageLinkIcon)`
  background-image: url(${clock});

  @media screen and (max-width: 1279px) {
    background-image: url(${clockMobile});
  }
`;

const PageLinkProfileIcon = styled(PageLinkIcon)`
  background-image: url(${({ url }) => url ?? profile});
  border-radius: 50%;

  @media screen and (max-width: 1279px) {
    background-image: url(${profileMobile});
  }
`;

const PageLinkIconNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-color: #8b572a;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
`;

const PageLinkText = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    color: white;
  }
  @media screen and (max-width: 479px) {
    display: block;
    color: white;
    font-size: 14px;
  }
`;

const categories = [
  {
    name: "women",
    displayText: "女裝",
  },
  {
    name: "men",
    displayText: "男裝",
  },
  {
    name: "accessories",
    displayText: "配件",
  },
];

function Header() {
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);

  const handleLinkClick = async () => {
    try {
      const response = await fetch("/api/add-browse-record", {
        //實際api
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`, //api中token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `${api.hostname}/products/details?id=${id}`, //實際點擊商品url
          timestamp: Date.now(),
        }),
      });

      if (response.ok) {
        console.log("瀏覽紀錄已更新");
      } else {
        console.error("發生錯誤");
      }
    } catch (error) {
      console.error("錯誤: " + error);
    }
  };

  return (
    <Wrapper>
      <Logo to="/" />
      <CategoryLinks>
        {categories.map(({ name, displayText }, index) => (
          <CategoryLink
            $isActive={category === name}
            key={index}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              navigate(`/?category=${name}`);
            }}
          >
            {displayText}
          </CategoryLink>
        ))}
      </CategoryLinks>
      <SearchInput
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            navigate(`/?keyword=${inputValue}`);
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <PageLinks>
        <PageLink to="/history" id="linkToRecord" onClick={handleLinkClick}>
          <PageLinkHistoryIcon icon={clock} />
          <PageLinkText>瀏覽紀錄</PageLinkText>
        </PageLink>
        <PageLink to="/checkout">
          <PageLinkCartIcon icon={cart}>
            <PageLinkIconNumber>{cartCount}</PageLinkIconNumber>
          </PageLinkCartIcon>
          <PageLinkText>購物車</PageLinkText>
        </PageLink>
        <PageLink to="/profile">
          <PageLinkProfileIcon icon={profile} url={user?.picture} />
          <PageLinkText>會員</PageLinkText>
        </PageLink>
      </PageLinks>
    </Wrapper>
  );
}

export default Header;