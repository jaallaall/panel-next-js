import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs, { TabsProps } from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { SxPropes } from 'interfaces'
import { useState } from 'react'

interface TabPanelProps {
    index: number
    value: number
}

const TabPanel: React.FC<TabPanelProps> = ({
    children,
    value,
    index,
    ...other
}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const MuiTabs: React.FC<
    {
        tabs: string[]
        content: React.ReactNode[]
        sx?: SxPropes
    } & TabsProps
> = ({ tabs, content, sx, ...rest }): React.ReactElement => {
    const [value, setValue] = useState<number>(0)

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    fontSize: 18,
                    '& .MuiButtonBase-root:not(.Mui-selected)': {
                        color: 'inherit',
                    },
                    ...sx,
                }}
                {...rest}
            >
                {tabs?.map((item, i) => (
                    <Tab label={item} {...a11yProps(i)} key={i} />
                ))}
            </Tabs>

            <TabPanel value={value} index={value}>
                {content[value] ? content[value] : content[0]}
            </TabPanel>
        </Box>
    )
}

export { MuiTabs as Tabs }
