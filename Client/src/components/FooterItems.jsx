import React from "react";
import {
  Stack,
  styled,
  Tooltip,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";



const Items = [
    {
      icon: <GitHubIcon />,
      link: "https://github.com/AlexEkeh",
      title: "Github",
      color: "inherit",
    },
    {
      icon: <LinkedInIcon />,
      link: "https://linkedin.com/in/alexanderekeh",
      title: "LinkedIn",
      color: "primary",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/alexanda.ekeh/",
      title: "Instagram",
      color: "secondary",
    },
  ];
  


const SocialIcons = styled(Stack)`
  padding: 0;
  & svg:hover {
    transition: 0.1s ease-out;
    background: inherit;
    transform: translateY(-10%);
  }
  @media (max-width: 361px) {
    transform: translateX(25vw);
  } ;
`;


const FooterItems = () => {
  return (
    <SocialIcons direction="row" sx={{ width: "10%" }}>
      {Items.map((item, index) => {
        return (
          <Tooltip title={item.title} key={index}>
            <IconButton
              component="a"
              target="_blank"
              href={item.link}
              size="large"
              color={item.color}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </SocialIcons>
  );
};

export default FooterItems;
