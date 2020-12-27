<template>
    <section class="wrapper">
        <div class="header">
            <div class="title">正则表达式大全（持续收录中）</div>
            <div class="search">
                <el-input
                    v-model="keyword"
                    placeholder="搜索关键词"
                    clearable
                    suffix-icon="el-icon-search"
                    @keydown.enter.native="handleSearch"
                    @blur="handleSearch"
                />
            </div>
        </div>
        <el-form
            :model="ruleForm"
            status-icon
        >
            <el-table
                :data="ruleForm.ruleList"
                highlight-current-row
                border
            >
                <el-table-column
                    prop="title"
                    label="校验项目"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="rule"
                    label="正则表达式"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="handleCopy(scope.row.rule)"
                            class="rule-btn"
                        >
                            {{ scope.row.rule }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="examples"
                    label="测试一下"
                >
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="`ruleList.${scope.$index}.value`"
                            :rules="{pattern: scope.row.rule, message: '校验不通过', trigger: 'change'}"
                        >
                            <el-input
                                v-model="scope.row.value"
                                :placeholder="`例如：${scope.row.examples.join('、')}`"
                            />
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </section>
</template>

<script>
import ruleList from '@/rule';

export default {
    name: 'Home',
    data () {
        return {
            ruleForm: { ruleList },
            ruleList,
            keyword: ''
        };
    },
    components: {},
    mounted () {
    },
    methods: {
        /**
         * 复制正则表达式
         * @param text
         */
        handleCopy (text) {

            this.$copyText(text).then(message => {
                console.log('copy', message);
                this.$notify({
                    title: '成功',
                    message: '已复制到剪切板',
                    type: 'success'
                });
            }).catch(err => {
                console.log('copy.err', err);
                this.$notify({
                    title: '提示',
                    message: '复制失败,请手动复制',
                    type: 'error'
                });
            });
        },

        /**
         * 搜索正则
         */
        handleSearch() {

            if (!this.keyword) {
                this.ruleForm.ruleList = ruleList;
                return;
            }
            this.ruleForm.ruleList = this.ruleList.filter(item => {
                if (item.title.includes(this.keyword)) {
                    return item;
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">

.wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    .header {
        .title {
            font-size: 28px;
        }
        .search {
            margin: 30px 0 22px;
            .el-input {
                width: 600px;
            }
        }
    }

    /deep/ .el-form {
        .el-form-item {
            margin: 22px 0;
        }

        .el-form-item__error {
            margin-top: 4px;
        }
        .el-table th {
            color: #000;
        }
    }

    .rule-btn {
        white-space: normal;
        text-align: left;
        line-height: 24px;
        user-select: auto;
    }
}
</style>
