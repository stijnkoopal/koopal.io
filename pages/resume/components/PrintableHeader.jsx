import styled from '@emotion/styled'
import { css } from '@emotion/core'
import useResume from '../../_components/useResume'
import { Box, Flex } from '@rebass/grid/dist/emotion'
import React from 'react'

const Name = styled('h1')(({ theme: { typography, palette: { colors } } }) => ({
  ...typography.headline,
  color: colors.grey[200],
  textTransform: 'uppercase',
  margin: 0,
}))

const Title = styled('h2')(({ theme: { typography } }) => ({
  ...typography.title,
  color: '#e1f0dc',
  margin: 0,
}))

const Website = styled('h3')(({ theme: { typography } }) => ({
  ...typography.subheading,
  color: '#dde3e3',
  margin: 0,
}))

const profilePictureContainerCss = css({
  background: 'linear-gradient(to right, #e3ddd8, #fefefe)',
  textAlign: 'center',
  borderRadius: '50%',
  height: '150px',
  overflow: 'hidden',
})

const profileCss = theme =>
  css({
    alignItems: 'center',
    textDecoration: 'none',
    ...theme.typography.body2,
  })

const LogoWithText = () => {
  const resume = useResume()
  return (
    <Flex flexDirection="column">
      <Flex>
        <Box as="img" css={{ width: '104px' }} src={resume.basics.logo} alt={resume.basics.name} />

        <Flex ml={3} flexDirection="column" justifyContent="center">
          <Name>{resume.basics.name}</Name>
          <Title>{resume.basics.label}</Title>
          <Website>{resume.basics.email}</Website>
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        {resume.basics.profiles.map(profile => (
          <Flex as="a" mr={4} key={profile.key} href={profile.url} css={profileCss}>
            <Box as="img" mr={2} alt={profile.key} css={{ width: '16px' }} src={profile.icon} />{' '}
            {profile.username}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

const HeaderContainer = styled(Flex)(({ onlyPrint }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  display: onlyPrint ? 'none' : 'flex',
  '@media print': {
    display: 'flex',
  },
  '-webkit-print-color-adjust': 'exact',
}))

const PrintableHeader = ({ className, onlyPrint = false }) => {
  const resume = useResume()
  return (
    <HeaderContainer className={className} m={3} onlyPrint={onlyPrint}>
      <LogoWithText />
      <Box css={profilePictureContainerCss} width={['150px']}>
        <Box as="img" css={{ width: '80%' }} src={resume.basics.image} alt={resume.basics.name} />
      </Box>
    </HeaderContainer>
  )
}

export default PrintableHeader
