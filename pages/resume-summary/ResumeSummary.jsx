import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { css } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import useResume from '../_components/useResume'
import { FixedBackground } from '../_components/Layout'

const formatDate = date =>
  date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }) : 'present'

const LeftConnectedBlock = styled(Box)(({ theme: { typography, spacing, palette: { colors } } }) => ({
  ...typography.body2,
  color: colors.grey[800],
  background: colors.grey[200],
  borderTopRightRadius: spacing.unit * 4,
  borderBottomRightRadius: spacing.unit * 4,
  pageBreakInside: 'avoid',
  h1: {
    ...typography.heading,
    fontSize: '1.25em',
    margin: `${spacing.unit}px 0`,
  },
  p: {
    margin: `${spacing.unit}px 0`,
  },
  a: {
    textDecoration: 'none',
    color: colors.grey[800],
  },
}))

LeftConnectedBlock.defaultProps = {
  mt: 4,
  mr: 5,
  py: 3,
  pl: 6,
  pr: 5,
}

const HorizontalDescriptionList = styled('dl')(() => ({
  '&:after': {
    content: '""',
    display: 'table',
    clear: 'both',
  },
  dt: {
    float: 'left',
    width: '30%',
    textAlign: 'left',
    clear: 'left',
  },
  dd: {
    float: 'left',
    width: '60%',
  },
}))

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
  width: '150px',
  height: '150px',
  border: '5px solid white',
  overflow: 'hidden',
})

const LogoWithText = () => {
  const resume = useResume()
  return (
    <Flex>
      <img style={{ width: '104px' }} src={resume.basics.logo} alt={resume.basics.name} />

      <Flex ml={3} flexDirection="column" justifyContent="center">
        <Name>{resume.basics.name}</Name>
        <Title>{resume.basics.label}</Title>
        <Website>{resume.basics.email}</Website>
      </Flex>
    </Flex>
  )
}

const HeaderContainer = styled(Flex)(({ onlyPrint }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '154px',
  display: onlyPrint ? 'none' : 'flex',
  '@media print': {
    display: 'flex',
  },
  '-webkit-print-color-adjust': 'exact',
}))

const Header = ({ onlyPrint = false }) => {
  const resume = useResume()
  return (
    <HeaderContainer m={3} onlyPrint={onlyPrint}>
      <LogoWithText />
      <Box css={profilePictureContainerCss}>
        <img style={{ width: '80%' }} src={resume.basics.image} alt={resume.basics.name} />
      </Box>
    </HeaderContainer>
  )
}

const ResumeSummary = ({ theme }) => {
  const resume = useResume()

  const summaryAsHtml = resume.basics.summary.replace(/\n/g, '<br/>')

  const groupedLanguages = resume.skills.reduce(
    (acc, val) => ({
      ...acc,
      [val.category]: (acc[val.category] || []).concat(val.name),
    }),
    {},
  )

  const recentExperiences = resume.work.filter(({ type }) => type === 'project')

  return (
    <FixedBackground style={{ zIndex: 1 }}>
      <Header />

      <LeftConnectedBlock>
        <h1>About me</h1>

        <span dangerouslySetInnerHTML={{ __html: summaryAsHtml }} />
      </LeftConnectedBlock>

      <LeftConnectedBlock style={{ pageBreakAfter: 'always' }}>
        <h1>Technical Summary</h1>

        <HorizontalDescriptionList>
          {Object.keys(groupedLanguages).map(category => (
            <React.Fragment key={category}>
              <dt>{category}</dt>
              <dd>{groupedLanguages[category].join(', ')}</dd>
            </React.Fragment>
          ))}
        </HorizontalDescriptionList>
      </LeftConnectedBlock>

      <Header onlyPrint="true" />

      <LeftConnectedBlock>
        <h1>Most Recent Experience</h1>

        {recentExperiences.slice(0, 4).map(experience => (
          <Box key={experience.startDate}>
            <Flex as="h4" mb={0} mt={2}>{experience.company}, {formatDate(experience.startDate)} - {formatDate(experience.endDate)}</Flex>

            <Box mt={0}>
            {experience.summary}
            </Box>
          </Box>
        ))}
      </LeftConnectedBlock>

      <LeftConnectedBlock>
        <h1>Contact</h1>

        <HorizontalDescriptionList>
          <dt>Web</dt>
          <dd>
            <a href={`tel:${resume.basics.url}`}>{resume.basics.url}</a>
          </dd>
          <dt>Mail</dt>
          <dd>
            <a href={`tel:${resume.basics.email}`}>{resume.basics.email}</a>
          </dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${resume.basics.phone}`}>{resume.basics.phone}</a>
          </dd>
          <dt>Address</dt>
          <dd>
            {resume.basics.location.address}, {resume.basics.location.city}
          </dd>
        </HorizontalDescriptionList>
      </LeftConnectedBlock>
    </FixedBackground>
  )
}

ResumeSummary.pageTitle = 'Resume Summary'

export default withTheme(ResumeSummary)
