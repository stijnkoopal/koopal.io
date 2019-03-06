import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'
import { Box, Flex } from '@rebass/grid/emotion'
import useResume from '../_components/useResume'

const ContactMethods = styled(Flex)(() => ({
  justifyContent: 'space-around',
  flexDirection: 'row',
}))

const ContactMethod = styled(Flex)(({ theme: { typography } }) => ({
  ...typography.body2,
  textDecoration: 'none',
  flexDirection: 'column',
  textAlign: 'center',
  width: '200px',
  '&:hover': {
    opacity: 0.7,
  }
}))

const IconCircle = styled(Flex)(({ color, theme: { spacing } }) => ({
  borderRadius: '50%',
  width: 8 * spacing.unit,
  height: 8 * spacing.unit,
  background: color,
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
}))

const Icon = ({ src, alt, backgroundColor }) => (
  <IconCircle color={backgroundColor}>
    <img src={src} alt={alt} style={{ width: 32 }}/>
  </IconCircle>
)

const Title = styled.h2(() => ({
  textTransform: 'uppercase',
}))

const Value = styled(Box)(({ theme: { typography } }) => ({
  ...typography.caption,
  textDecoration: 'none',
}))

const ContactContainer = styled(Flex)(() => ({
  flexDirection: 'column',
  width: '100%',
}))

const Header = styled(Flex)(() => ({
  alignSelf: 'center',
  marginTop: 0,
})).withComponent('h1')

const SubHeader = Header.withComponent('h2')

const VerticallyCenter = styled(Flex)({
  alignItems: 'center',
  flexDirection: 'row',
  height: '100%',
})

const Contact = ({ theme: { palette } }) => {
  const resume = useResume()
  return (
    <VerticallyCenter>
      <ContactContainer>
        <Header>Reaching out</Header>
        <SubHeader mt={[2, 3]}>is just a click away.</SubHeader>

        <ContactMethods mt={[4, 5]}>
          <ContactMethod as="a" href={`maillto:${resume.basics.email}`} title="Mail me!">
            <Icon src="/static/logos/envelope.svg" alt="Email"
                  backgroundColor={palette.colors.visualizations[1]}/>
            <Title>Email</Title>
            <Value>{resume.basics.email}</Value>
          </ContactMethod>

          <ContactMethod as="a" href={`tel:${resume.basics.phone}`} title="Call me!">
            <Icon src="/static/logos/telephone.svg" alt="Telephone"
                  backgroundColor={palette.colors.visualizations[2]}/>
            <Title>Phone</Title>
            <Value>{resume.basics.phone}</Value>
          </ContactMethod>

          <ContactMethod>
            <Icon src="/static/logos/home-location.svg" alt="Home"
                  backgroundColor={palette.colors.visualizations[0]}/>
            <Title>KVK</Title>
            <Value>???????</Value>
          </ContactMethod>
        </ContactMethods>
      </ContactContainer>
    </VerticallyCenter>
  )
}

Contact.propTypes = {
  resume: PropTypes.object,
}

Contact.defaultProps = {
  resume: {
    basics: {
      profiles: [],
    },
  },
}

export default withTheme(Contact)
