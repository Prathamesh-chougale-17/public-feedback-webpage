"use client";
import {
  Autocomplete,
  Group,
  Burger,
  rem,
  Button,
  Avatar,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import MantineLogo from "@/public/police.png";
import Classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "@mantine/core";
import ActionToggle from "./DarkMode/ChangeTheme";
import { useSession } from "next-auth/react";
//
const links = [
  { link: "/", label: "Home" },
  { link: "/location", label: "Locations" },
  { link: "/feedback", label: "Feedback" },
];

export function HeaderSearch() {
  const [opened, setOpened] = useState(false);

  const { status, data: session } = useSession();
  const image = session?.user?.image;
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={Classes.link}
      // onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Link>
  ));
  const mobileitems = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={Classes.link}
      onClick={() => setOpened(!opened)}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={Classes.header} ht->
      <div className={Classes.inner}>
        <Group>
          <Image
            src={MantineLogo}
            alt="Mantine logo"
            width={28}
            className="h-auto"
            priority
          />
        </Group>
        <Group>
          <Group visibleFrom="sm">
            <Group ml={50} gap={5} className={Classes.links}>
              {items}
            </Group>
          </Group>
          <Group>
            <ActionToggle />
          </Group>
          <Autocomplete
            className={Classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
          <Group className="md:hidden">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  size="sm"
                  hiddenFrom="sm"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item>{mobileitems}</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          {status === "authenticated" ? (
            <Menu>
              <Menu.Target>
                <Avatar src={image} className={Classes.Avatar} />
              </Menu.Target>
              <Menu.Dropdown>
                <Link href="/api/auth/signout">
                  <Button>Sign out</Button>
                </Link>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link href="/api/auth/signin">
              <Button fullWidth>Sign in</Button>
            </Link>
          )}
        </Group>
      </div>
    </header>
  );
}
