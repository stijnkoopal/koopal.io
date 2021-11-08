import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import React from 'react'
import { FixedBackground } from '../../../_components/Layout'
import useResume from '../../../_components/useResume'
import PrintableHeader from '../../components/PrintableHeader'

const formatDate = (date) =>
  date && date !== 'present'
    ? `'` + new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' })
    : 'present'

const ConnectedBlock = styled(Box)(({ theme: { typography, spacing, palette: { colors } } }) => ({
  ...typography.body1,
  color: colors.grey[800],
  background: colors.grey[200],
  pageBreakInside: 'avoid',
  h1: {
    ...typography.heading,
    fontSize: '1.25em',
    margin: `${spacing.unit}px 0`,
  },
  p: {
    margin: `${spacing.unit}px 0`,
  },
  div: {
    paddingBottom: spacing.unit,
  },
  a: {
    textDecoration: 'none',
    color: colors.grey[800],
  },
  'media print': {
    width: '50%',
  },
}))

const FullBlock = styled(ConnectedBlock)({
  width: '100%',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
})

FullBlock.defaultProps = {
  mt: 3,
  py: 2,
  pl: [2, 4],
  pr: 3,
}

const LeftConnectedBlock = styled(ConnectedBlock)(({ theme: { spacing } }) => ({
  borderTopRightRadius: spacing.unit * 4,
  borderBottomRightRadius: spacing.unit * 4,
}))

LeftConnectedBlock.defaultProps = {
  mt: 3,
  py: 2,
  mr: 3,
  pl: [2, 4],
  pr: 3,
  width: [1, 0.5],
}

const RightConnectedBlock = styled(ConnectedBlock)(({ theme: { spacing } }) => ({
  borderTopLeftRadius: spacing.unit * 4,
  borderBottomLeftRadius: spacing.unit * 4,
}))

RightConnectedBlock.defaultProps = {
  mt: 3,
  py: 2,
  ml: [4, 3],
  pr: [2, 4],
  pl: 3,
  width: [1, 0.5],
}

const HorizontalDescriptionList = styled('dl')(({ theme: { typography, palette: { colors } } }) => ({
  ...typography.body2,
  color: colors.grey[800],
  '&:after': {
    content: '""',
    display: 'table',
    clear: 'both',
  },
  dt: {
    float: 'left',
    width: '35%',
    textAlign: 'left',
    clear: 'left',
  },
  dd: {
    float: 'left',
    width: '50%',
  },
}))

const Keywords = styled('span')(({ theme: { typography, palette: { colors } } }) => ({
  ...typography.caption,
  color: colors.grey[800],
  fontStyle: 'italic',
  display: 'block',
}))

const Experience = (experience) => (
  <Box key={experience.startDate}>
    <Flex as="h4" mb={0} mt={2}>
      {experience.company}, {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
    </Flex>
    <Flex as="h6" mb={0} mt={0}>
      {experience.position}
    </Flex>
    <Box mt={0}>
      {experience.summary} <Keywords>{experience.keywords.join(', ')}</Keywords>
    </Box>
  </Box>
)

const RowContainer = styled(Flex)({
  '@media print': {
    flexDirection: 'row',
  },
})

RowContainer.defaultProps = {
  flexDirection: ['column', 'row'],
}

const ResumeDetailed = () => {
  const resume = useResume()

  const groupedLanguages = resume.skills.reduce(
    (acc, val) => ({
      ...acc,
      [val.category]: (acc[val.category] || []).concat(val.name),
    }),
    {},
  )

  const experiences = resume.work.filter(({ type }) => type === 'project')

  const educationAndCertifications = resume.education
    .map((e) => ({ ...e, year: parseInt(e.endDate.split('-').shift()) }))
    .sort((a, b) => (a.year === b.year ? 0 : a.year > b.year ? -1 : 1))

  return (
    <FixedBackground css={{ zIndex: 1 }}>
      <PrintableHeader css={{ height: '125px' }} />

      <RowContainer>
        <LeftConnectedBlock>
          <h1>Profile</h1>

          {resume.basics.summary}
        </LeftConnectedBlock>

        <RightConnectedBlock>
          <h1>About me</h1>
          <HorizontalDescriptionList>
            <dt>Focus area</dt>
            <dd>{resume.basics.focusArea}</dd>
            <dt>Availability</dt>
            <dd>{resume.basics.availability.join(', ')}</dd>
            <dt>Languages</dt>
            <dd>{resume.languages.map((l) => l.language).join(', ')}</dd>
            <dt>Birthday</dt>
            <dd>{resume.basics.birthDay.year}</dd>
          </HorizontalDescriptionList>
        </RightConnectedBlock>
      </RowContainer>

      <FullBlock>
        <h1>Technical Summary</h1>

        <HorizontalDescriptionList>
          {Object.keys(groupedLanguages).map((category) => (
            <React.Fragment key={category}>
              <dt>{category}</dt>
              <dd>{groupedLanguages[category].join(', ')}</dd>
            </React.Fragment>
          ))}
        </HorizontalDescriptionList>
      </FullBlock>

      <FullBlock css={{ pageBreakAfter: 'always' }}>
        <h1>Contact</h1>

        <HorizontalDescriptionList>
          <dt>Web</dt>
          <dd>
            <a href={resume.basics.url}>{resume.basics.url}</a>
          </dd>
          <dt>Mail</dt>
          <dd>
            <a href={`mailto:${resume.basics.email}`}>{resume.basics.email}</a>
          </dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${resume.basics.phone}`}>{resume.basics.phone}</a>
          </dd>
          <dt>Address</dt>
          <dd>
            {resume.basics.location.address}, {resume.basics.location.city}
          </dd>
          <dt>KVK</dt>
          <dd>
            <a
              href={`https://www.kvk.nl/zoeken/?source=all&q=${resume.basics.chamberOfCommerceNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.basics.chamberOfCommerceNumber}
            </a>
          </dd>
        </HorizontalDescriptionList>
      </FullBlock>

      <PrintableHeader css={{ height: '125px' }} onlyPrint="true" />

      <RowContainer>
        <LeftConnectedBlock>
          <h1>Education & Certifications</h1>

          {educationAndCertifications.map(({ institution, area, year }) => (
            <p key={area}>
              <strong>{area}</strong>
              <br />
              {institution}, {year}
              <br />
            </p>
          ))}
        </LeftConnectedBlock>

        <RightConnectedBlock>
          <h1>Experiences</h1>

          {experiences.slice(0, 2).map(Experience)}
        </RightConnectedBlock>
      </RowContainer>

      <RowContainer>
        <LeftConnectedBlock>{experiences.slice(2, 5).map(Experience)}</LeftConnectedBlock>

        <RightConnectedBlock>{experiences.slice(5).map(Experience)}</RightConnectedBlock>
      </RowContainer>
    </FixedBackground>
  )
}

ResumeDetailed.pageTitle = 'Resume Summary'

export default withTheme(ResumeDetailed)
