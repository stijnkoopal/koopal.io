import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import useResume from '../../../_components/useResume'
import { FixedBackground } from '../../../_components/Layout'
import PrintableHeader from '../../components/PrintableHeader'

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
    margin: `${spacing.unit / 2}px 0`,
  },
  p: {
    margin: `${spacing.unit / 2}px 0`,
  },
  a: {
    textDecoration: 'none',
    color: colors.grey[800],
  },
}))

LeftConnectedBlock.defaultProps = {
  mt: 4,
  mr: [2, 5],
  py: 2,
  pl: [3, 6],
  pr: [2, 5],
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

const ResumeSummary = () => {
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
    <FixedBackground css={{ zIndex: 1 }}>
      <PrintableHeader />

      <LeftConnectedBlock>
        <h1>Profile</h1>

        <span dangerouslySetInnerHTML={{ __html: summaryAsHtml }} />
      </LeftConnectedBlock>

      <LeftConnectedBlock>
        <h1>About me</h1>
        <HorizontalDescriptionList>
          <dt>Focus area</dt>
          <dd>{resume.basics.focusArea}</dd>
          <dt>Availability</dt>
          <dd>{resume.basics.availability.join(', ')}</dd>
          <dt>Languages</dt>
          <dd>{resume.languages.map(l => l.language).join(', ')}</dd>
          <dt>Birthday</dt>
          <dd>{resume.basics.birthDay.year}</dd>
        </HorizontalDescriptionList>
      </LeftConnectedBlock>

      <LeftConnectedBlock css={{ pageBreakAfter: 'always' }}>
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

      <PrintableHeader onlyPrint="true" />

      <LeftConnectedBlock>
        <h1>Most Recent Experience</h1>

        {recentExperiences.slice(0, 5).map(experience => (
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
