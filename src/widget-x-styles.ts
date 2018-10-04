import {TRule, TRuleProps} from 'fela';

const rule1: TRule = (props: TRuleProps) => ({
    color: 'red'
});

const rule2: TRule = (props: TRuleProps) => ({
    cursor: 'pointer'
});

export const widgetXStyles = [rule1, rule2];
