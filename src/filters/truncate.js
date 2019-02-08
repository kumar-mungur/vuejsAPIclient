export default{
  filters: {
    truncateText: function (value, length) {
      if (!value) return ''
      return value.slice(0, length) + '...'
    }
  }
}
