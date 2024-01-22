"use client";
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';
import Link from 'next/link';
import React, { useEffect , useState} from 'react';



const data = [
  // {
  //   title: 'About',
  //   links: [
  //     { label: 'Features', link: '#' },
  //     { label: 'Pricing', link: '#' },
  //     { label: 'Support', link: '#' },
  //     { label: 'Forums', link: '#' },
  //   ],
  // },
  {
    title: 'Police Newletter',
    links: [
      { label: 'Contribute', link: '#' },
      { label: 'Media assets', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Helpline',
    links: [
      { label: 'Police Control Room : 100', link: '100' },
      { label: 'Cyber Crime         : 1930', link: '1930' },
      { label: 'Ambulance           : 102', link: '102' },
      { label: 'Child Helpline      : 109', link: '109' },
    ],
  },
];
function VisitCounter() {
    const [visits, setVisits] = useState(0);
  
    // Loading from localStorage
    useEffect(() => {
      const storedVisits = Number(localStorage.getItem("visitCounter")) || 0;
      setVisits(storedVisits + 1);
    }, []);
  
    // Saving in localStorage
    useEffect(() => {
      return localStorage.setItem("visitCounter", visits.toString());
    }, [visits]);
  
    return <p>{visits}</p>;
  }
export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target="_blank"
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer} >

      <Container className={classes.inner}  z-index="1000">
        {/* <div className={classes.logo}>
          <MantineLogo size={30} />
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div> */}
        <div className={classes.groups}>
          <Text>
            <Text className={classes.title}>Number of Visitor</Text>
            <VisitCounter/>
            <Text className={classes.link} component="a" href="https://www.police.rajasthan.gov.in/old/SWPOReportPublicPSWise.aspx?Pol_Dist_Cd=11%20&Stateco=8&State=RAJASTHAN" target="_blank">List of Police Station</Text>
          </Text>
          {groups}
          </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
           Rajasthan Police. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
            <Link href="https://twitter.com/PoliceRajasthan"  target="_blank">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
            </Link >
            <Link href="https://www.youtube.com/@PoliceRajasthanOfficial" target='_blank'>
            
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube  style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
            </Link>
            <Link href="https://www.instagram.com/PoliceRajasthan"  target="_blank">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
            
            </Link>
        </Group>
      </Container>
    </footer>
  );
}