<template>
    <NConfigProvider
        :locale="ruRU"
        :date-locale="dateRuRU"
        :theme-overrides="themeOverrides"
        :breakpoints="breakpoints"
    >
        <NMessageProvider :max="3" placement="bottom-right">
            <NNotificationProvider :max="3" placement="top-right">
                <NDialogProvider>
                    <NLoadingBarProvider>
                        <router-view></router-view>
                    </NLoadingBarProvider>
                </NDialogProvider>
            </NNotificationProvider>
        </NMessageProvider>
    </NConfigProvider>
</template>

<script>
import {
    NConfigProvider,
    NMessageProvider,
    NNotificationProvider,
    NLoadingBarProvider,
    NDialogProvider
} from 'naive-ui'
import { ruRU, dateRuRU } from 'naive-ui'

export default {
    data() {
        return {
            ruRU,
            dateRuRU,
            themeOverrides: {
                common: {
                    primaryColorHover: '#3b82f6FF',
                    fontSize: '16px',
                    fontSizeMedium: '16px',
                    fontFamily: '"Roboto", sans-serif',
                    primaryColor: '#1f5bd5FF',
                    borderRadius: '5px',
                    borderColor: 'rgba(209, 213, 219, 1)'
                },
                Button: {
                    colorPrimary: '#1f5bd5FF',
                    colorHoverPrimary: '#1346AEFF',
                    colorPressedPrimary: '#1346AEFF',
                    colorFocusPrimary: '#1f5bd5FF',
                    rippleColorPrimary: '#3864BFFF',
                    colorDisabledPrimary: '#1f5bd5FF',
                    borderHoverPrimary: '0px',
                    borderPressedPrimary: '0px',
                    borderFocusPrimary: '0px',
                    borderDisabledPrimary: '0px',
                    borderPrimary: '0px',
                    borderRadiusTiny: '6px',
                    borderRadiusSmall: '6px',
                    borderRadiusMedium: '6px',
                    borderRadiusLarge: '6px',
                    fontSizeLarge: '16px'
                },
                Checkbox: {
                    colorChecked: '#1f5bd5FF',
                    borderRadius: '4px',
                    borderChecked: '1px solid #1f5bd5FF',
                    borderFocus: '1px solid #1f5bd5FF',
                    boxShadowFocus: '0 0 0 2px #1f5bd54d'
                },
                Card: {
                    borderRadius: '10px',
                    borderColor: 'rgba(229, 231, 235, 1)',
                    paddingSmall: '12px 16px',
                    paddingMedium: '19px 24px',
                    paddingLarge: '23px 32px',
                    paddingHuge: '27px 40px'
                },
                Dropdown: {
                    borderRadius: '10px'
                },
                Input: {
                    borderRadius: '5px',
                    boxShadowFocus: '0 0 0 2px rgba(35, 96, 208, 0.2)',
                    border: '1px solid rgb(209, 213, 219)',
                    placeholderColor: 'rgba(144, 144, 144, 1)'
                },
                Form: {
                    feedbackFontSizeMedium: '16px',
                    labelFontSizeLeftMedium: '16px',
                    labelFontSizeTopMedium: '16px'
                },
                Steps: {
                    indicatorTextColorFinish: '#1f5bd5FF',
                    indicatorBorderColorProcess: '#1F5BD5FF',
                    indicatorBorderColorFinish: '#1F5BD5FF',
                    indicatorColorProcess: '#1F5BD5FF',
                    splitorColorFinish: '#1F5BD5FF'
                },
                Notification: {
                    borderRadius: '10px'
                },
                Message: {
                    borderRadius: '10px',
                    padding: '15px 20px',
                    fontSize: '16px'
                },
                Badge: {
                    fontFamily: '"Roboto", sans-serif'
                },
                Watermark: {
                    fontFamily: '"Roboto", sans-serif'
                },
                Tabs: {
                    tabFontSizeMedium: '16px',
                    tabGapMediumCard: '8px',
                    tabGapSmallCard: '8px',
                    tabGapLargeCard: '8px',
                    tabBorderColor: 'rgba(209, 213, 219, 1)'
                }
            },
            breakpoints: { xs: 0, s: 750, m: 1024, l: 1280, xl: 1536, xxl: 1920 }
        }
    },
    components: {
        NConfigProvider,
        NNotificationProvider,
        NMessageProvider,
        NLoadingBarProvider,
        NDialogProvider
    }
}
</script>

<style lang="css"></style>
