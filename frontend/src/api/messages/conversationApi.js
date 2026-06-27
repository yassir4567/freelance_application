import apiClient from "../apiClient";

const conversationApi = {
  getConversations(query) {
    return apiClient.get(`/conversations?${query}`);
  },
  getMessages(conversationId) {
    return apiClient.get(`/conversations/${conversationId}/messages`);
  },
  sendMessage(conversationId, data) {
    return apiClient.post(
      `/conversations/${conversationId}/send-message`,
      data,
    );
  },
};

export { conversationApi };
